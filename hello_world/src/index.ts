import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import {DbClient} from "./db/index"
import test from "./test"

export default class Server {
  constructor(app: Application) {
    this.config(app);
    const connect = async () => {   
	try {       
		await DbClient.connect()
		await test(DbClient)       
		console.log("Успешно подключились к базе данных")
	} catch (e) {       
		console.log(e)   
	}
    }
    connect()
 }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://0.0.0.0:3000"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
