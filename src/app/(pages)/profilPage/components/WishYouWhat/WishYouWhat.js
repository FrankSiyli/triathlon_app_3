"use client";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "@/app/components/Loader/Loader";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const WishYouWhat = ({ setShowProfil }) => {
  const { data, isLoading: fetchingPosts } = useSWR(
    "/api/wishListPosts/fetchWishListPosts",
    fetcher
  );
  const fetchedPosts = data?.posts;
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState({});
  const [userPost, setUserPost] = useState("");
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const maxCharLimit = 100;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharLimit) {
      setUserPost(inputValue);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const session = await getSession();
    if (!session) {
      handleAlert("Bitte melde dich an");
      return;
    }
    if (!userPost) {
      return handleAlert("Bitte fülle alle Felder aus");
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/wishListPosts/sendWishListPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createPost",
          name: session.user.name,
          email: session.user.email,
          post: userPost,
        }),
      });

      if (res.ok) {
        setUserPost("");
        mutate("/api/wishListPosts/fetchWishListPosts");
        setIsLoading(false);
      }
    } catch (error) {
      handleAlert("Etwas ist schief gelaufen");
    }
    setIsLoading(false);
  };

  const handleLikePost = async (postId, postAuthor) => {
    const session = await getSession();
    if (!session) {
      return handleAlert("Bitte melde dich an");
    }
    if (likedPosts.has(postId)) {
      return handleAlert("Bereits 1x gewählt");
    }
    if (postAuthor === session.user.name) {
      return handleAlert("😅");
    }
    setLoadingLikes({ ...loadingLikes, [postId]: true });
    try {
      const response = await fetch("/api/wishListPosts/sendWishListPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateLikes",
          id: postId,
        }),
      });

      if (response.ok) {
        likedPosts.add(postId);
        mutate("/api/wishListPosts/fetchWishListPosts");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
    setLoadingLikes({ ...loadingLikes, [postId]: false });
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreatePost(event);
    }
  };

  const handleAlert = (errorMessage) => {
    setShowAlert(true);
    setError(errorMessage);
  };

  const handleBackClick = () => {
    setShowProfil();
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm m-3 border border-transparent text-first "
          onClick={handleBackClick}
        >
          <ArrowLeftSvg />
        </button>
      </div>
      <p className="mx-auto w-40 text-center -mt-10">Wünsch dir was!</p>
      <div className="mb-20">
        <div className="w-11/12   border border-first/50 linear-background rounded-md p-4 my-20 mx-auto max-w-xl text-center">
          <p>
            Du wünscht dir eine neue Funktion, oder einen neuen Trainingsplan in
            der App?
          </p>
          <br />
          <p>Dann entscheide einfach mit, was als nächstes kommt.</p>
          <div className="flex flex-col">
            <input
              className="input  border border-transparent mt-5 mx-10 text-center"
              type="string"
              value={userPost}
              placeholder="Wunsch"
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyDown}
            />
            <span className="text-sm text-alert mt-1">
              {maxCharLimit - userPost.length}/100
            </span>
          </div>
          <button
            onClick={handleCreatePost}
            className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
          >
            Senden
          </button>
        </div>

        <Loader isLoading={isLoading || fetchingPosts} />

        {!isLoading &&
          fetchedPosts
            ?.slice()
            .reverse()
            .map((post) => (
              <div
                key={post._id}
                className={`relative w-full my-7 shadow-md p-2 rounded-md  max-w-xl text-center ${
                  post.isDone ? "border-l-2 border-r-2 border-green" : null
                }`}
              >
                <div className="absolute top-0 left-2 ">{post.name}:</div>
                <div className="mb-10 mt-5 mx-3  overflow-hidden">
                  {post.post}
                </div>
                <div className="text-sm absolute bottom-1 left-2">
                  {new Date(post.updatedAt).toISOString().split("T")[0]}
                </div>

                <button
                  className="absolute bottom-1 right-2"
                  onClick={() => handleLikePost(post._id, post.name)}
                >
                  <span className="text-sm">
                    gefällt
                    {loadingLikes[post._id] ? (
                      <span className="loading loading-ring loading-sm"></span>
                    ) : (
                      <span> {post.likes} </span>
                    )}
                    mal
                  </span>
                  <span className="text-xl ml-2">👍</span>
                </button>
              </div>
            ))}
      </div>
      {error && showAlert && (
        <Alert alertText={error} setShowAlert={setShowAlert} />
      )}
    </>
  );
};

export default WishYouWhat;
