var tableReader = (function() {
  var readTableForAttribute = function(stats, filename) {
    stats["loyaltyBase"] = -30;

    return stats;
  }
  return {
    readTableForAttribute: readTableForAttribute,
  };
})();

module.exports = tableReader;
