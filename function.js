module.exports = {
  generateProductId: function (userContext, events, done) {
    const uuid = Math.random().toString(36).substring(2, 10).toUpperCase();
    userContext.vars.productId = `P_STRESS_${uuid}`;
    return done();
  }
};