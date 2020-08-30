import Sequelize, { Model, Transaction } from "sequelize";

const sequelize = new Sequelize.Sequelize('sqlite::memory:');

export function withTimestamp(attributes: { [key: string]: any }) {
  return {
    ...attributes,
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
  };
}

class User extends Model {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static findByNumber(): Promise<User> {
    return this.findByPk(1);
  }
  static findUsers(userIds: number[], options: { transaction?: Transaction }) {
    return this.findAll({
      where: {
        id: userIds
      },
      ...options
    });
  }
}

User.init(withTimestamp({
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    field: 'id'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
}), {
  sequelize,
  modelName: 'User',
  tableName: 'users',

  createdAt: 'created_at',
  updatedAt: 'updated_at',

  scopes: {
    a() {
      return { where: { id: 1 } };
    }
  },
});




const a = async () => {
  const s1 = await User.scope('a').findByPk(1);
  const s2 = await User.findByPk(1);

  const dd = sequelize.models.User as typeof User;
  const s3 = await dd.findAll({
  });
};
