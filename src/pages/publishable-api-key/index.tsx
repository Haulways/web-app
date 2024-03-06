import { useRedirect } from "react-admin";
import { BsArrowLeft } from "react-icons/bs";
import Table from "./Table";
import { Routes } from "../../routes";
import { Button } from "../ui/button";
import { Fragment } from "react";
import useToggleState from "../../lib/hooks/use-toggle-state";
import CreateAPIKey from "./CreateAPIKey";

const PublishableApiKey = () => {
  const redirect = useRedirect();
  const [showModal, openModal, closeModal, toggleModal] = useToggleState();

  return (
    <Fragment>
      <div className="flex flex-col space-y-4">
        <div
          onClick={() => redirect(Routes.SETTINGS_ROUTE)}
          className="flex space-x-2 items-center text-gray-500 text-xs font-medium hover:cursor-pointer px-3 pt-3"
        >
          <BsArrowLeft className="w-5 h-5" />
          <p className="text-sm">Back to settings</p>
        </div>

        <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
          <section className="flex justify-between items-center">
            <p className="text-xl md:text-3xl font-semibold">
              Publishable API keys
            </p>

            <Button
              onClick={openModal}
              variant={"outline"}
              className="p-3 text-xs"
            >
              Create API Key
            </Button>
          </section>

          <p className="text-gray-500 text-sm md:text-base">
            These publishable keys will allow you to authenticate API requests.
          </p>

          <Table />
        </div>
      </div>

      <CreateAPIKey show={showModal} close={closeModal} />
    </Fragment>
  );
};

export default PublishableApiKey;
