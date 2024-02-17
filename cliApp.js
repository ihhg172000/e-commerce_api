import { Command } from "commander";
import { connectDatabase, closeDatabase } from "./db.js";
import User from "./models/User.js";

const program = new Command();

program
  .command("createSuperuser <firstName> <lastName> <email> <password>")
  .description("Create a superuser with the provided details")
  .action(async (firstName, lastName, email, password) => {
    try {
      connectDatabase();

      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isSuperuser: true,
      });

      console.log(user.toJSON());

      closeDatabase();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

program.parse(process.argv);
