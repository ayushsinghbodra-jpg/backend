//this controller will handle all the errors like 404 page not found when it will be called from the routes

exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};

