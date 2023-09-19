// 创建数据库
db = db.getSiblingDB('mydb');

// 创建用户
db.createUser({
  user: 'mongodb',
  pwd: 'mongodb',
  roles: [
    {
      role: 'readWrite',
      db: 'mydb',
    },
  ],
});

// 创建集合
db.createCollection('test');
