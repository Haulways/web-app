import { useRedirect } from "react-admin";
import { BsArrowLeft } from "react-icons/bs";
import { Routes } from "../../routes.ts";
import { useParams } from "react-router-dom";
import { Input } from "../common/Form/Input/index.tsx";
import { Button } from "../ui/button.tsx";
import { Fragment, useState } from "react";
import React from "react";
// import { useFilePicker } from "use-file-picker";

const StoreDetails = () => {
  const redirect = useRedirect();
  const [verificationFile, setVerificationFile] = useState<File | null>(null);
  const [idenficationFile, setIdenficationFile] = useState<File | null>(null);
  // const params = useParams();
  // const {
  //   openFilePicker: openFilePickerBusinessIdentification,
  //   filesContent: businessIdentifcationFilesContent,
  //   errors: filePicker_errors_indentification,
  //   plainFiles: businessIdentifcationPlainFiles,
  // } = useFilePicker({
  //   readAs: "DataURL",
  //   multiple: false,
  //   limitFilesConfig: { min: 1 },
  //   minFileSize: 0.1, // in megabytes
  //   maxFileSize: 60, // in megabytes
  //   onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
  //     // this callback is called when there were no validation errors
  //     // console.log('onFilesSuccessfullySelected', plainFiles, filesContent)
  //   },
  // });
  // const {
  //   openFilePicker: openFilePickerBusinessVerification,
  //   filesContent: businessVerificationFilesContent,
  //   errors: filePicker_errors_verification,
  //   plainFiles: businessVerificationPlainFiles,
  // } = useFilePicker({
  //   readAs: "DataURL",
  //   multiple: false,
  //   limitFilesConfig: { min: 1 },
  //   minFileSize: 0.1, // in megabytes
  //   maxFileSize: 60, // in megabytes
  //   onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
  //     // this callback is called when there were no validation errors
  //     // console.log('onFilesSuccessfullySelected', plainFiles, filesContent)
  //   },
  // });

  const handleVerificationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setVerificationFile(e.target.files[0]);
    }
  };

  const handleIdenficationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setIdenficationFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col space-y-4 text-gray-500">
      {/* <div
        onClick={() => redirect(Routes.SETTINGS_ROUTE)}
        className="flex space-x-2 items-center text-gray-500 text-xs font-medium hover:cursor-pointer px-3 pt-3"
      >
        <BsArrowLeft className="w-5 h-5" />
        <p className="text-sm">Back to settings</p>
      </div> */}

      <div className="flex flex-col space-y-3 p-6 md:p-8 bg-white rounded-md md:w-[70%]">
        {/* <p className="text-2xl md:text-3xl font-medium text-black">
          Store Details
        </p>

        <p className="">Manage your business details</p> */}

        <Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">General</p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Store name</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="store name" defaultValue={"E Store"} />
            </span>
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
            {/* <span
            onClick={openFilePickerBusinessVerification}
            className="bg-gray-200 overflow-hidden rounded hover:cursor-pointer"
          >
            {businessVerificationFilesContent.length !== 0 ? (
              <p className="p-2">{businessVerificationFilesContent[0].name}</p>
            ) : (
              <p className="text-sm p-3 text-gray-400">Select document</p>
            )}
          </span> */}
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
            {/* <span
            onClick={openFilePickerBusinessIdentification}
            className="bg-gray-200 overflow-hidden rounded hover:cursor-pointer"
          >
            {businessIdentifcationFilesContent.length !== 0 ? (
              <p className="p-2">{businessIdentifcationFilesContent[0].name}</p>
            ) : (
              <p className="text-sm p-3 text-gray-400">Select document</p>
            )}
          </span> */}

            {/* {businessIdentifcationFilesContent.length !== 0 ? <div className="relative h-full w-full">
                    <Image
                      src={businessIdentifcationFilesContent[0]?.content ?? ''}
                      alt={businessIdentifcationFilesContent[0]?.name ?? ''}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div> : null} */}
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: `<metamap-button
            clientid="65abc9d25957de001dbae8ca"
            flowId="65abc9d2702f10001dc942fa"
            metadata='{"key": "value"}'
          />`,
            }}
          />
        </Fragment>

        <Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">
            Advanced settings
          </p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Swap link template</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="https://acme.inc/swap={swap_id}" />
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Draft order link template</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="https://acme.inc/payment={payment_id}" />
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Invite link template</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="https://acme-admin.inc/invite?token={invite_token}" />
            </span>
          </div>
        </Fragment>

        <Fragment>
          <p className="text-black font-medium text-lg pt-3 pb-2">Instagram</p>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">API key</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="oR07ZVsWIQhnmBYUzYxzT6OLB6c2" />
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="font-medium">Instagram ID</p>
            <span className="bg-gray-200 overflow-hidden rounded">
              <Input placeholder="5fa8927b8dcc" />
            </span>
          </div>
        </Fragment>

        <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 pt-5">
          <Button variant={"outline"}>Cancel</Button>
          <Button variant={"secondary"}>Save</Button>
        </section>
        <div className="py-6"></div>
      </div>
    </div>
  );
};

export default StoreDetails;
