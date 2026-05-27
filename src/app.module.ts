import {Module} from "@nestjs/common";

import {UserModule} from "./user/user.module";
import {RecordModule} from "./record/record.module";
import {PrismaService} from "./prisma/prisma.service";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    AuthModule, UserModule, RecordModule
  ],
  providers: [PrismaService]
})
export class AppModule {}