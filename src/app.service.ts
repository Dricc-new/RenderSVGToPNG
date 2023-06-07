import { Injectable } from '@nestjs/common';
//"eyJpdiI6IkNDRVRxcnoxSkE1ZWY2bzE0ZDhxY3c9PSIsInZhbHVlIjoiY01TczlwNzJvaXNubThVWHM5d2VtRHpsWTE0Sks4WlZNZXcwQ0V3RXdmNzM1Qy9pS2VOR3g0cG9FMllUeklOWSIsIm1hYyI6ImUxY2Q1YzgzYjE0ZDk0NDM1NjQ3MzE1MmM4M2RiNWE1ZGQzNmRmMDdiNDk2ZTFmMzI2ZWQ5YmIyYjI3ZjhjYTgiLCJ0YWciOiIifQ=="
@Injectable()
export class AppService {
  getHello(): string {
    return 'version 1.0.0';
  }
}
