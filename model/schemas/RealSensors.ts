// Defining schema interface
import {ObjectId} from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

interface RealSensors {
    _id: ObjectId;
    batteryLevel: number;
    deviceInfo: Record<"tags", Record<"deviceId", string>>;
    object: Record<"relative_humidity" | "ambient_temperature", string>;
    time: string
}

export default RealSensors

