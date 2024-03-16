import { AdminPostStoreReq } from "@medusajs/medusa";
import { Fragment, useState } from "react";
import { useRedirect } from "react-admin";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
import useAlert from "../../lib/hooks/use-alert";
import { medusaClient } from "../../lib/services/medusa";
import { Routes } from "../../routes";
import { Input } from "../common/Form/Input";
import { Button } from "../ui/button";
import Spinner from "../common/assets/spinner";
import React from "react";
// import { useFilePicker } from "use-file-picker";

enum FieldsName {
  STORE_NAME = "name",
  STORE_DESCRIPTION = "description",
  SWAP_LINK = "swap_link_template",
  PAYMENT_LINK = "payment_link_template",
  INVITE_LINK = "invite_link_template",
  API_KEY = "api_key",
  API_ID = "api_id",
}

interface InputFields extends AdminPostStoreReq {
  description: string;
  api_key: string;
  api_id: string;
}

const StoreDetails = (props) => {
  const { type } = props;
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const redirect = useRedirect();
  const [businessVerificationFile, setBusinessVerificationFile] =
    useState<File | null>(null);
  const [idenficationFile, setIdenficationFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = formMethods;

  const handleVerificationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setBusinessVerificationFile(e.target.files[0]);
    }
  };

  const handleIdenficationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setIdenficationFile(e.target.files[0]);
    }
  };

  const updateStoreDetail = handleSubmit(async (data: InputFields) => {
    setIsSubmitting(true);
    console.log('data', data, businessVerificationFile, idenficationFile)
    medusaClient.admin.store
      .update({
        invite_link_template: data.invite_link_template,
        payment_link_template: data.payment_link_template,
        swap_link_template: data.swap_link_template,
        name: data.name,
        metadata: {
          description: data.description,
          api_key: data.api_key,
          api_id: data.api_id,
          business_document: businessVerificationFile,
          identification_document: idenficationFile,
        },
      })
      .then(() => {
        openAlert({
          ...state,
          title: "Store updated",
          variant: "success",
          active: true,
        });
        setIsSubmitting(false);
      })
      .catch(() => {
        openAlert({
          ...state,
          title: "Failed to update store",
          variant: "error",
          active: true,
        });
        setIsSubmitting(false);
      });
  });

  const createStoreDetail = handleSubmit(async (data: InputFields) => {
    setIsSubmitting(true);
    console.log('data', data, businessVerificationFile, idenficationFile)
    medusaClient.admin.store
      .update({
        invite_link_template: data.invite_link_template,
        payment_link_template: data.payment_link_template,
        swap_link_template: data.swap_link_template,
        name: data.name,
        metadata: {
          description: data.description,
          api_key: data.api_key,
          api_id: data.api_id,
          business_document: businessVerificationFile,
          identification_document: idenficationFile,
        },
      })
      .then(() => {
        openAlert({
          ...state,
          title: "Store updated",
          variant: "success",
          active: true,
        });
        setIsSubmitting(false);
      })
      .catch(() => {
        openAlert({
          ...state,
          title: "Failed to update store",
          variant: "error",
          active: true,
        });
        setIsSubmitting(false);
      });
  });

  return (
    <div className="flex flex-col space-y-4 text-gray-500">
      {/* <div
        onClick={() => redirect(Routes.SETTINGS_ROUTE)}
        className="flex space-x-2 items-center text-gray-500 text-xs font-medium hover:cursor-pointer px-3 pt-3"
      >
        <BsArrowLeft className="w-5 h-5" />
        <p className="text-sm">Back to settings</p>
      </div> */}

      <div className="flex flex-col space-y-3 p-6 mb-7 md:p-8 bg-white rounded-md md:w-[70%]">
        {/* <p className="text-2xl md:text-3xl font-medium text-black">
          Store Details
        </p> */}

        <p className="">Fill in your store details</p>

        <Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">General</p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Store name</p>
            <span
              className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.STORE_NAME]?.message &&
                "border border-red-500"
                }`}
            >
              <Input
                className="w-full"
                id={FieldsName.STORE_NAME}
                placeholder="E store"
                {...register(FieldsName.STORE_NAME, {
                  required: "Store name is required",
                })}
              />
            </span>
            {formErrors[FieldsName.STORE_NAME]?.message && (
              <p className="text-red-500 text-sm">
                {formErrors[FieldsName.STORE_NAME].message ?? ""}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Store description</p>
            <span
              className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.STORE_DESCRIPTION]?.message &&
                "border border-red-500"
                }`}
            >
              <Input
                className="w-full"
                id={FieldsName.STORE_DESCRIPTION}
                placeholder="Warm and cozy..."
                {...register(FieldsName.STORE_DESCRIPTION, {
                  // required: "Store description is required",
                })}
              />
            </span>
            {formErrors[FieldsName.STORE_DESCRIPTION]?.message && (
              <p className="text-red-500 text-sm">
                {formErrors[FieldsName.STORE_DESCRIPTION].message ?? ""}
              </p>
            )}
          </div>
        </Fragment>

        <Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">KYC</p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Business verification document</p>
            <span className="bg-gray-200 overflow-hidden rounded hover:cursor-pointer">
              <Input
                id="businessVerification"
                type="file"
                placeholder="Select document"
                onChange={handleVerificationFileChange}
              />
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Identification document</p>

            <span className="bg-gray-200 overflow-hidden rounded hover:cursor-pointer">
              <Input
                id="businessIdenfication"
                type="file"
                placeholder="Select document"
                onChange={handleIdenficationFileChange}
              />
            </span>
          </div>
          {!type && type !== 'create' ? (<div
            dangerouslySetInnerHTML={{
              __html: `<metamap-button
            clientid="65abc9d25957de001dbae8ca"
            flowId="65abc9d2702f10001dc942fa"
            metadata='{"key": "value"}'
          />`,
            }}
          />) : (null)}

        </Fragment>

        {!type && type !== 'create' ? (<><Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">
            Advanced settings
          </p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Swap link template</p>
            <span
              className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.SWAP_LINK]?.message &&
                "border border-red-500"
                }`}
            >
              <Input
                className="w-full"
                id={FieldsName.SWAP_LINK}
                placeholder="https://acme.inc/swap={swap_id}"
                {...register(FieldsName.SWAP_LINK, {
                  // required: "Store description is required",
                })}
              />
            </span>
            {formErrors[FieldsName.SWAP_LINK]?.message && (
              <p className="text-red-500 text-sm">
                {formErrors[FieldsName.SWAP_LINK].message ?? ""}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Draft order link template</p>
            <span
              className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.PAYMENT_LINK]?.message &&
                "border border-red-500"
                }`}
            >
              <Input
                className="w-full"
                id={FieldsName.PAYMENT_LINK}
                placeholder="https://acme.inc/payment={payment_id}"
                {...register(FieldsName.PAYMENT_LINK, {
                  // required: "Store description is required",
                })}
              />
            </span>
            {formErrors[FieldsName.PAYMENT_LINK]?.message && (
              <p className="text-red-500 text-sm">
                {formErrors[FieldsName.PAYMENT_LINK].message ?? ""}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Invite link template</p>
            <span
              className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.INVITE_LINK]?.message &&
                "border border-red-500"
                }`}
            >
              <Input
                className="w-full"
                id={FieldsName.INVITE_LINK}
                placeholder="https://acme-admin.inc/invite?token={invite_token}"
                {...register(FieldsName.INVITE_LINK, {
                  // required: "Store description is required",
                })}
              />
            </span>
            {formErrors[FieldsName.INVITE_LINK]?.message && (
              <p className="text-red-500 text-sm">
                {formErrors[FieldsName.INVITE_LINK].message ?? ""}
              </p>
            )}
          </div>
        </Fragment>

          <Fragment>
            <p className="text-black font-medium text-lg pt-3 pb-2">Instagram</p>

            <div className="flex flex-col space-y-3">
              <p className="font-medium">API key</p>
              <span
                className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.API_KEY]?.message &&
                  "border border-red-500"
                  }`}
              >
                <Input
                  className="w-full"
                  id={FieldsName.API_KEY}
                  placeholder="oR07ZVsWIQhnmBYUzYxzT6OLB6c2"
                  {...register(FieldsName.API_KEY, {
                    // required: "Store description is required",
                  })}
                />
              </span>
              {formErrors[FieldsName.API_KEY]?.message && (
                <p className="text-red-500 text-sm">
                  {formErrors[FieldsName.API_KEY].message ?? ""}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <p className="font-medium">Instagram ID</p>
              <span
                className={`bg-gray-200 overflow-hidden rounded ${formErrors[FieldsName.API_ID]?.message &&
                  "border border-red-500"
                  }`}
              >
                <Input
                  className="w-full"
                  id={FieldsName.API_ID}
                  placeholder="5fa8927b8dcc"
                  {...register(FieldsName.API_ID, {
                    // required: "Store description is required",
                  })}
                />
              </span>
              {formErrors[FieldsName.API_ID]?.message && (
                <p className="text-red-500 text-sm">
                  {formErrors[FieldsName.API_ID].message ?? ""}
                </p>
              )}
            </div>
          </Fragment></>) : (null)}


        <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 pt-5">
          <Button variant={"outline"}>Cancel</Button>
          <Button
            onClick={type && type === 'create' ? (createStoreDetail) : (updateStoreDetail)}
            variant={"secondary"}
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center space-x-2">
              {type && type === 'create' ? (<p>Create Store</p>) : (<p>Save</p>)}
              {isSubmitting && <Spinner color="white" />}
            </div>
          </Button>
        </section>
      </div>

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </div>
  );
};

export default StoreDetails;
