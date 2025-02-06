import { ApiProperty } from "@nestjs/swagger";

export class CreateClassroomDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    capacity: number;;
}
