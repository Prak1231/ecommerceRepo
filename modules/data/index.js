'use strict';

module.exports.getData = (req, res) => {
  let success;
  if (req.method === 'POST') {
    success = req.body.success;
  } else if (req.method === 'GET') {
    success = req.query.success;
  }

  success = parseInt(success);

  console.log("success", success);

  if (success) {
    res.send({
      success: true,
      data: [
        {
          name: "aaaa",
          address: "bb"
        },
        {
          name: "aaaa",
          address: "bb"
        },
        {
          name: "aaaa",
          address: "bb"
        }
      ]
    });
    return;
  }

  res.send({
    success: false,
    error: "error message"
  });
};
