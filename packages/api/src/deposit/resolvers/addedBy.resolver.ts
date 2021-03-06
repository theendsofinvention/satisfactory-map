import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Deposit } from "../deposit.model";

export default {
  Deposit: {
    addedBy: _ => {
      return getConnection()
        .getRepository(Deposit)
        .createQueryBuilder("deposit")
        .relation("creator")
        .of(_)
        .loadOne();
    }
  }
} as IResolvers;
