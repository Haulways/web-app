import {
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  Create,
  EditGuesser,
  FilterForm,
  SelectInput,
  TopToolbar,
  WithListContext,
  useDataProvider,
  useGetList,
} from "react-admin";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdFooter, CreateAd } from "../../components";
import { ThemeContext } from "../../components/context/ThemeProvider";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { PiCaretDownBold } from "react-icons/pi";
import { SearchBox } from "../../components/search/SearchBox";
import { NormalCard } from "../../components/card/NormalCard";

export const AdListContent = () => {
  const { theme } = useContext(ThemeContext);
  const [input, setInput] = React.useState("");

  const search = (
    <svg
      className="absolute w-[17px] h-[20px] top-[50%] left-[1rem] translate-y-[-50%]"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.579 6.31004e-07C8.07976 0.000801964 6.60162 0.353313 5.26339 1.0292C3.92515 1.70509 2.76414 2.6855 1.87367 3.89164C0.9832 5.09778 0.38811 6.496 0.13623 7.97393C-0.115651 9.45185 -0.0172969 10.9683 0.423386 12.4013C0.86407 13.8343 1.63479 15.1439 2.6736 16.2249C3.71242 17.3059 4.99035 18.1281 6.40468 18.6255C7.81902 19.1229 9.33031 19.2815 10.8171 19.0886C12.3039 18.8957 13.7247 18.3567 14.9653 17.515L20.8883 23.4332C21.0528 23.6097 21.2512 23.7513 21.4716 23.8496C21.692 23.9478 21.93 24.0006 22.1713 24.0048C22.4126 24.0091 22.6522 23.9647 22.876 23.8743C23.0998 23.784 23.303 23.6494 23.4737 23.4788C23.6443 23.3081 23.7788 23.1049 23.8692 22.8811C23.9596 22.6574 24.004 22.4177 23.9997 22.1764C23.9955 21.9351 23.9426 21.6972 23.8444 21.4767C23.7462 21.2563 23.6046 21.0579 23.428 20.8934L17.5099 14.9704C18.489 13.5294 19.0568 11.8487 19.1522 10.1092C19.2476 8.36962 18.8671 6.63695 18.0515 5.09746C17.236 3.55798 16.0162 2.26991 14.5234 1.37177C13.0306 0.473622 11.3212 -0.000631453 9.579 6.31004e-07ZM3.58892 9.58412C3.58892 7.99545 4.22002 6.47185 5.34337 5.3485C6.46673 4.22514 7.99033 3.59404 9.579 3.59404C11.1677 3.59404 12.6913 4.22514 13.8146 5.3485C14.938 6.47185 15.5691 7.99545 15.5691 9.58412C15.5691 11.1728 14.938 12.6964 13.8146 13.8197C12.6913 14.9431 11.1677 15.5742 9.579 15.5742C7.99033 15.5742 6.46673 14.9431 5.34337 13.8197C4.22002 12.6964 3.58892 11.1728 3.58892 9.58412Z"
        fill="#7A7A7A"
      />
    </svg>
  );

  const TagFilters = [
    // <SearchBox placeholder='Search for tags' />

    <SelectInput
      label="Vendors"
      source="vendor"
      alwaysOn
      sx={{
        overflow: "hidden",

        "& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ": {
          maxWidth: "154px",
          borderRadius: "100px",
          overflow: "hidden",
        },
      }}
      choices={[{ id: "1", name: "Victor" }]}
    />,

    <SelectInput
      label="Product"
      source="product"
      alwaysOn
      sx={{
        overflow: "hidden",
        "& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ": {
          maxWidth: "154px",
          borderRadius: "100px",
          overflow: "hidden",
        },
      }}
      choices={[{ id: "1", name: "Victor" }]}
    />,

    <SelectInput
      label="Price tag"
      source="price"
      alwaysOn
      sx={{
        overflow: "hidden",
        "& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ": {
          maxWidth: "154px",
          borderRadius: "100px",
          overflow: "hidden",
        },
      }}
      choices={[{ id: "1", name: "Victor" }]}
    />,
  ];

  const TagActions = () => (
    <TopToolbar
      className="store__card"
      sx={{
        backgroundColor: "transparent !important",
        width: "310px",
        margin: "0 auto",

        flexDirection: "column !important",

        "& .MuiToolbar-root .RaTopToolbar-root": {},
        "& .RaList-actions": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Stack
        direction="row"
        columnGap="30px"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          maxWidth: "100%",
        }}
      >
        <SearchBox placeholder="Search for Ads" />

        <div>
          <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" />
        </div>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        className="store__card "
        sx={{
          overflowX: "scroll !important",
          maxWidth: "330px",
          margin: "0 auto",
          justifyContent: "center",
          // '& label[data-shrink=false]+.MuiInputBase-formControl .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input': {
          //     padding: '0px 15px 20px',
          // }
        }}
      >
        <FilterForm
          sx={{
            flexWrap: "nowrap",
            "&  .css-oh5jlk-RaFilterForm-root": {
              flexWrap: "nowrap",
            },
            "& .css-19n9far-MuiInputBase-root-MuiFilledInput-root::before": {
              borderBottom: "none",
            },
            "& .MuiFormLabel-root": {
              // Change the font size of the labels
              fontSize: "15px",
              fontWeight: "600",
            },
            "& .MuiInputBase-root": {
              height: "fit-content",
            },
          }}
          filters={TagFilters}
        />
      </Stack>
    </TopToolbar>
  );
  return (
    <>
      <div className="feed--page">
        <div className="relative">
          <div className="pb-[10px] px-[14px] ">
            {/* Search box */}
            <div
              className="general search--box max-w-md"
              style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
            >
              <input
                className="search--input"
                type="search"
                placeholder="Search for Ads"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {search}
            </div>
          </div>
        </div>

        {/* filter tags  */}
        <div className="mt-[25px] mb-[10px] max-w-[90vw] mx-auto store__card">
          <ul className="flex gap-x-[20px] items-center overflow-x-scroll store__card">
            <li
              className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer"
              style={{
                backgroundColor:
                  theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)",
                color: theme === "light" ? "#222" : "#fff",
              }}
            >
              Ad Type
              <PiCaretDownBold className="flex-shrink-0" />
            </li>
            <li
              className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer"
              style={{
                backgroundColor:
                  theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)",
                color: theme === "light" ? "#222" : "#fff",
              }}
            >
              Status
              <PiCaretDownBold className="flex-shrink-0" />
            </li>
          </ul>
        </div>

        <WithListContext
          render={({ isLoading, data }) =>
            !isLoading && (
              <>
                <Grid
                  container
                  spacing="10px"
                  rowGap={{ xs: 2 }}
                  className="pb-[4rem] pt-[1rem]"
                >
                  {data &&
                    data
                      .filter((post) => post.ad_type === "posts")
                      .map((post) => {
                        console.log(post);
                        return (
                          <React.Fragment key={post.id}>
                            <PostAds postad={post} />
                          </React.Fragment>
                        );
                      })}
                </Grid>
              </>
            )
          }
        />
      </div>

      <AdFooter />
    </>
  );
};

const PostAds = (postad) => {
  const useFetchMultipleLists = (resources) => {
    const dataProvider = useDataProvider();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchResources = async () => {
        try {
          const dataPromises = resources.map((resource) =>
            dataProvider.getList(resource, {
              pagination: { page: 1, perPage: 1000 },
              sort: { field: "id", order: "ASC" },
              filter: {},
            })
          );

          const results = await Promise.all(dataPromises);
          const combinedData = results.reduce(
            (acc, { data }) => [...acc, ...data],
            []
          );
          setData(combinedData);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };

      fetchResources();
    }, [dataProvider, resources]);

    return { data, loading, error };
  };

  const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
  const { data } = useFetchMultipleLists(tables);
  const postAd_id = postad?.postad?.post_id;
  // console.log(data, postAd_id);
  let seenIds = new Set();

  return (
    <>
      {data &&
        data
          .filter((pst) => {
            if (seenIds.has(pst.postAd_id)) {
              // This id has been seen before, skip this item
              return false;
            } else {
              // This id has not been seen before, add it to the set and keep the item
              seenIds.add(pst.postAd_id);
              return true;
            }
          })
          .map((ad_post) => {
            const mediaUrl = ad_post.media[0]; // Get the URL of the single media file
            const isImage =
              mediaUrl.includes(".jpg") ||
              mediaUrl.includes(".jpeg") ||
              mediaUrl.includes(".png");
            console.log(ad_post);
            return (
              <Grid key={ad_post.id} item xs={6} sm={6} md={4}>
                <NormalCard
                  mediaUrl={mediaUrl}
                  post={ad_post}
                  isImage={isImage}
                  url={ad_post.URL}
                />
              </Grid>
            );
          })}
    </>
  );
};

export const AdCreateContent = () => (
  <Create title=" ">
    <CreateAd collectionName="ads" />
  </Create>
);

export const AdEditContent = () => <EditGuesser />;

export const AdShowContent = () => {
  return <></>;
};
