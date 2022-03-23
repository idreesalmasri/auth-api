'use strict';

const basicAuth = require('../src/auth/middleware/basicAuth');
const { db, users } = require('../src/auth/models/index');

let userInfo = {
  admin: { username: 'admin-basic', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  // await user.create(userInfo.admin);
  
});
afterAll(async () => {
  await db.drop();
  
})

describe('Auth Middleware', () => {

  
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return basicAuth(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    }); // it()

    it('logs in an admin user with the right credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };

      return basicAuth(req, res, next).then(() => {

          expect(next).not.toHaveBeenCalledWith();
        });

    }); // it()

  });

});