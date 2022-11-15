import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react"
import authenticator from "~/services/auth.server";


/**
 * check the user to see if there is an active session, if not
 * redirect to login page
 *
 * @param param0
 * @returns
 */
export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

/**
 *  handle the logout request
 *
 * @param param0
 */
export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};
export default function Index() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Welcome {data?.name} {data?.token}</h1>
      <Link to="films">
        Films
      </Link>
      <Form method="post">
        <div className="absolute right-1 top-1 ...">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rig">Log Out</button>
        </div>
      </Form>
    </div>
  );
}
