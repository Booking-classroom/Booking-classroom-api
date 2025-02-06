import { Controller, Get, Post, Body, Patch, Param,Query, Delete, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassroomEntity } from './entities/classroom.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('classroom')
@UseGuards(AuthGuard)
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

  @Get('availability/:isAvailable')
  async findByAvailability(@Param('isAvailable') isAvailable: string): Promise<ClassroomEntity[]> {
    const isAvailableBool = isAvailable === 'true';
    return this.classroomService.findByAvailability(isAvailableBool);
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
