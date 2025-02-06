import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @ApiBody({ type: CreateClassroomDto })
  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.classroomService.findOneById(+id);
  }

  @Get(':isAvailable')
  findByAvailability(@Param('isAvailable') isAvailable: boolean) {
    return this.classroomService.findByAvailability(isAvailable);
  }

  @ApiBody({ type: UpdateClassroomDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
