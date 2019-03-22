import { simpleExecute } from "../bootstrap/database";
import oracledb from "oracledb";

export async function getSingleCustomer(id) {
  const query = `Select id, name, surname, email_address from CUSTOMER c where c.ID = :id`;

  const binds = {
    id
  };

  const result = await simpleExecute(query, binds);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
}

export async function getAllCustomers() {
  const query = `Select * from CUSTOMER`;

  const result = await simpleExecute(query);

  if (result.rows.length > 0) {
    return result.rows;
  }

  return null;
}

export async function create(customer) {
  const query = `insert into CUSTOMER (name,surname,email_address) values (:name,:surname,:email_address) returning id into :id`;

  customer.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  };

  const result = await simpleExecute(query, customer);

  customer.id = result.outBinds.id[0];
  return customer;
}

export async function update(customer) {
  const query = `update CUSTOMER set name = :name, surname = :surname, email_address= :email_address where id = :id `;

  const result = await simpleExecute(query, customer);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return customer;
  } else {
    return null;
  }
}

export async function del(id) {
  const query = `
            begin
                delete from CUSTOMER where id = :id; 
                 :rowcount := sql%rowcount;
            end;`;

  const binds = {
    id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };

  const result = await simpleExecute(query, binds);
  return result.outBinds.rowcount === 1;
}
