const { User } = require("./models/User");

const resolvers = {
  Query: {
    hello: () => "hellow",
    GetUserByID: async (_, { ID }) => {
      console.log("idx" + ID);
      return await User.findById(ID);
    },
    GetUsers: async (_, { count }) => {
      return await User.find({}).limit(count);
    },
    totalUsers: () => {
      User.countDocuments().then(function (err, data) {
        if (!err) {
          console.log(data);
          return data;
        } else {
          throw err;
        }
      });
    },
  },
  Mutation: {
    createUser: async (_, { name, mobile, email, status }) => {
      console.log(name);
      const _obj = new User({ name, mobile, email, status });
      await _obj.save();
      return _obj;
    },
    updateUser: async (_, { name }) => {
      const _obj = new User({ name });
      await _obj.save();
      return _obj;
    },
    deleteUser: async (_, { id }) => {
      const _obj = await User.findByIdAndDelete(id);
      return "deleted successfully";
    }
    // createUserArray: async (_, { count }) => {
    //   let UserArry = [];
    //   for (var i = 0; i < count; i++) {
    //     const kitty = new User({ name: "User " + i });
    //     let dim = await kitty.save();
    //     UserArry.push(dim);
    //   }
    //   return UserArry;
    // }
  }
};


module.exports = { resolvers }
