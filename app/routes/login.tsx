
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

/**
 * called when the user hits button to login
 *
 * @param param0
 * @returns
 */
export const action: ActionFunction = async ({ request, context }) => {
    // call my authenticator
    const resp = await authenticator.authenticate("form", request, {
        successRedirect: "/",
        failureRedirect: "/login",
        throwOnError: true,
        context,
    });
    console.log(resp);
    return resp;
};

/**
 * get the cookie and see if there are any errors that were
 * generated when attempting to login
 *
 * @param param0
 * @returns
 */
export const loader: LoaderFunction = async ({ request }) => {

    await authenticator.isAuthenticated(request, {
        successRedirect: "/"
    });

    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );

    const error = session.get("sessionErrorKey");
    return json<any>({ error });
};

/**
 *
 * @returns
 */
export default function LoginPage() {
    // if i got an error it will come back with the loader data
    const loaderData = useLoaderData();
    return (
        <div>
            <h1 className="ml-1 font-bold">Welcome to Remix-Auth Example</h1>
            <Form method="post">
                <div className="grid gap-1 mb-6 md:grid-cols-4 ml-1">
                    <input type="email"
                        className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="email" placeholder="email" required />

                    <input
                        className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="current-password"
                    />
                
                    </div>
                    <button className="bg-blue-600 rounded hover:bg-blue-400 text-white font-bold py-2 px-4 ml-1">Sign In</button>

                </Form>
            <div>
                {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
            </div>
        </div>
    );
}