import express from 'express';
import socket from 'socket.io';

import { MessageModel, DialogModel } from '../models';

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  updateReadStatus = (
    res: express.Response,
    userId: string,
    dialogId: any
  ): void => {
    MessageModel.updateMany(
      { dialog: dialogId, user: { $ne: userId } },
      { $set: { read: true } },
      (err: any): void => {
        if (err) {
          res.status(500).json({
            status: "error",
            message: err,
          });
        } else {
          this.io.emit("SERVER:MESSAGES_READED", {
            userId,
            dialogId,
          });
        }
      }
    );
  };

  index = (req: express.Request, res: express.Response): void => {
    const dialogId: any = req.query.dialog;
    const userId: string = req.user._id;

    this.updateReadStatus(res, userId, dialogId);

    MessageModel.find({ dialog: dialogId })
      .populate(["dialog", "user"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: "Messages not found",
          });
        }
        res.json(messages);
      });
  };

  create = (req: express.Request, res: express.Response): void => {
    const userId: string = req.user._id;

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId,
    };

    const message = new MessageModel(postData);

    this.updateReadStatus(res, userId, req.body.dialog_id);

    message
      .save()
      .then((obj: any) => {
        obj.populate(
          ["dialog", "user"],
          (err: any, message: any) => {
            if (err) {
              return res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogModel.findOneAndUpdate(
              { _id: postData.dialog },
              { lastMessage: message._id },
              { upsert: true },
              function (err) {
                if (err) {
                  return res.status(500).json({
                    status: "error",
                    message: err,
                  });
                }
              }
            );

            res.json(message);

            this.io.emit("SERVER:NEW_MESSAGE", message);
          }
        );
      })
      .catch((reason) => {
        res.json(reason);
      });
  };

  delete = (req: express.Request, res: express.Response): void => {
    const id: any = req.query.id;
    const userId: string = req.user._id;

    MessageModel.findById(id, (err, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      if (message.user.toString() === userId) {
        const dialogId = message.dialog;
        message.remove();

        MessageModel.findOne(
          { dialog: dialogId },
          {},
          (err: any, lastMessage: any) => {
            if (err) {
              res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogModel.findById(dialogId, (err) => {
              if (err) {
                res.status(500).json({
                  status: "error",
                  message: err,
                });
              }
              message.dialog.lastMessage = lastMessage ? lastMessage.toString() : "";
              message.dialog.save();
            });
          }
        );
        return res.json({
          status: "success",
          message: "Message deleted",
        });
      }
    });
  };
}

export default MessageController;