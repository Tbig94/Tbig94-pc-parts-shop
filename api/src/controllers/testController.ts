const roleTestUser = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw Error(`err...`);
  }
};

const roleTestAdmin = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw Error(`err...`);
  }
};

const TestController = {
  roleTestUser,
  roleTestAdmin,
};

export default TestController;
