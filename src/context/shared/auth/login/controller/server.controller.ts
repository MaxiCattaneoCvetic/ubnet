import { Controller, Get } from "@nestjs/common";

@Controller('server')
export class ServerController {


    @Get()
    async wake_up(): Promise<void> {

    }

}