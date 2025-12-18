import React from "react";

const BlogCard = ({ data }) => {
  const { image, title, description, authorName, email, authorTitle, authorImage } = data;

  return (
    <article className="rounded-xl overflow-hidden bg-white">
      <img src={image} alt={title} className="w-full h-60 object-cover" />

      <div className="p-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 leading-snug">
          {title}
        </h2>

        <p className="text-gray-500 mt-3 text-sm">
          {description}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <img
            src={authorImage}
            className="w-12 h-12 rounded-full object-cover"
            alt={authorName}
          />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm"> {authorName}</h4>
            <p className="text-gray-500 text-xs">{authorTitle || email}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
