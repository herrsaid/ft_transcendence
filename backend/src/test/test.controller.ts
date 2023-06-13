import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get()
    name() {
        return({name:'said'})
    }
}
