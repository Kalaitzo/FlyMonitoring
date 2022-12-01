import {ObjectId} from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

interface TestInterface {
    _id: ObjectId;
    type: string;
    controlledProperty: string[];
}

export default TestInterface