// routes/search.tsx
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Kurt", "Jimmy", "Amy", "Jim", "Janis", "Brian"];

interface Data {
    results: string[];
    query: string;
}

export const handler: Handlers<Data> = {
    GET(req, ctx){
        const url =  new URL(req.url)
        const query = url.searchParams.get("nameInput") || "";
        const results = NAMES.filter((name) => name.includes(query));
        return ctx.render({ results, query });
    }
};

export default function SearchPage({ data }: PageProps<Data>){
    const { results, query } = data;
    return(
        <div class={ 'flex justify-center' }>
            <form>
                <label for={ 'nameInput' }
                       class={ 'form-label inline-block' }>Name: </label>

                <input id={ 'nameInput' }
                       type={ 'text' }
                       name={ 'nameInput' }
                       value={ query }
                       placeholder={ 'Insert name here...' }
                       class={'form-control ' +
                              ' block ' +
                              ' border ' +
                              ' border-solid ' +
                              ' border-gray-300 ' +
                              ' rounded ' +
                              ' w-full ' +
                              ' my-2'}/>
                <div>
                    <button type={ 'submit' } class={"bg-blue-600 text-white rounded px-6 py-2.5"}>Search</button>
                </div>
            </form>
            <ul class={'mx-2'}>
                {results.map((name) => <li key={ name }>{ name }</li>)}
            </ul>
        </div>
    )
}