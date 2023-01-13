// Defining schema interface
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

interface DustSensor {
    _id: ObjectId;
    username: string;
    password: string;
}

export default DustSensor