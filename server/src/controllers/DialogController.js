const express = require('express');
const DialogModel = require('../models/Dialog');
const MessageModel = require('../models/Message');

class DialogController {
  constructor(io) {
    this.io = io;
  }

  index(req, res) {
    const userId = req.params._id;

    DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(['author', 'partner'])
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
        },
      })
      .exec(function(err, dialogs) {
        if (err) {
          return res.status(404).json({
            message: 'Dialogs not found',
          });
        }
        return res.json(dialogs);
      });
  };

  create(req, res) {
    
    const postData = {
      author: req.params._id,
      partner: req.body.partner,
    };

    DialogModel.findOne(
      {
        author: req.params._id,
        partner: req.body.partner,
      },
      (err, user) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: err,
          });
        }
        if (user) {
          return res.status(403).json({
            status: 'error',
            message: 'Такой диалог уже есть',
          });
        } else {
          const dialog = new DialogModel(postData);

          dialog
            .save()
            .then((dialogObj) => {
              const message = new MessageModel({
                text: req.body.text,
                user: req.params._id,
                dialog: dialogObj._id,
              });

              message
                .save()
                .then(() => {
                  dialogObj.lastMessage = message._id;
                  dialogObj.save().then(() => {
                    res.json(dialogObj);
                    console.log('?')
                    this.io.emit('SERVER:DIALOG_CREATED', {
                      ...postData,
                      dialog: dialogObj,
                    });
                  });
                })
                .catch(reason => {
                  res.json(reason);
                });
            })
            .catch(err => {
              res.json({
                status: 'error',
                message: err,
              });
            });
        }
      },
    );
  };

  delete(req, res) {
    const id = req.params.id;
    DialogModel.findOneAndRemove({ _id: id })
      .then(dialog => {
        if (dialog) {
          res.json({
            message: `Dialog deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `Dialog not found`,
        });
      });
  };
}

module.exports = DialogController;
