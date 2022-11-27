import { PageProps, Handlers } from "$fresh/server.ts";
import Test from "../model/testDB.ts"

interface TestItem {
    name: string;
}

export const handler: Handlers<TestItem | null> = {
    async GET(_, ctx) {
        const { testName } = ctx.params;
        const newTest: TestItem = {name:  testName}

        const testForDB = new Test({
            name: testName.toString(),
            description: 'A random description for now!'
        })

        const testFromMongoDb = await Test.findOne({name: testName});

        if (!testFromMongoDb){
            await testForDB.save();
        }
        else{
            newTest.name = 'There is a test with that name in the collection'
            return ctx.render(newTest)
        }

        return ctx.render(newTest)
    }
};

export default function NewTest({ data }: PageProps<TestItem | null>) {
    if (!data){
        return <div>Didn't insert new test</div>
    }

    if (data.name === 'There is a test with that name in the collection'){
        return (
            <div>
                The item already exists in the collection
            </div>
        )
    }
    else {
        return (
            <div>
                The new item name is : {data.name}
            </div>
        )
    }
}