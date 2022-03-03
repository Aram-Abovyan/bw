exports.getUserData = (req, res, next) => {
  const { user } = req
  res.status(200).json({
    success: true,
    data: {
      user
    }
  })
}