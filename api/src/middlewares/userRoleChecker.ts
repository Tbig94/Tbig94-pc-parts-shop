import Roles from "./../types/roles";

const checkUserRole = (requiredRole: Roles) => {
  return (req, res, next) => {
    const userRole: Roles = req.user.role;

    if (userRole === requiredRole) {
      next();
    } else {
      res.status(403).json({
        status: "failed",
        message: "Permission denied",
      });
    }
  };
};

const UserRoleChecker = {
  checkUserRole,
};
export default UserRoleChecker;
