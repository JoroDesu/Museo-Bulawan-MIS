import React, { useState } from 'react'
import AdminNav from '../../components/navbar/AdminNav'
import axios from "axios";
import CustomDatePicker from '../../components/function/CustomDatePicker'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Button from "@/components/ui/button"

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const ArticleForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [address, setAddress] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [showModal, setShowModal] = useState(false);


  const Categories = ['Education', 'Exhibit', 'Contents', 'Other'];


  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // Initial content
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("article_category", category);
    formData.append("description", editor?.getHTML() || "");
    formData.append("user_id", 1);
    formData.append("author", author);
    formData.append("address", address);
    formData.append("selectedDate", selectedDate);
  
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
  
    // Log FormData to check values before submission
    console.log("📦 FormData being submitted:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/article", // Change the endpoint as needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      console.log("Article created successfully!", response.data);
    } catch (error) {
      console.error("Error creating article:", error.response?.data || error.message);
    }
  };
  
  
  
  
  
  return (
    <>
      <div className='w-screen min-h-[79.8rem] h-screen bg-[#F0F0F0] select-none flex pt-[7rem]'>
        <div className='bg-[#1C1B19] w-auto min-h-full h-full min-w-[6rem] sm:min-w-auto'>
          <AdminNav />
        </div>
        <div className='w-full min-h-full h-full flex flex-col gap-y-10 px-7 pb-7 pt-[4rem] overflow-scroll'>
          <span className='text-5xl font-semibold'>Article Management</span>
          <div className='w-full h-full flex flex-col xl:flex-row gap-y-5 xl:gap-y-0 xl:gap-x-5 '>
            <div className='min-w-[34rem] h-full flex flex-col gap-y-7'>
              {/* info bar */}
              <div className='w-full max-w-[35rem] text-gray-500 min-h-[5rem] flex justify-start py-2 gap-x-2'>
                <button className='px-4 h-full border-1 border-gray-500 rounded-lg cursor-pointer'>
                  <span className='text-2xl font-semibold'>Artifact</span>
                </button>
              </div>

              <div className='w-full h-full flex flex-col gap-y-[5rem]'>
                <div className='bg-[#161616] px-4 h-[5rem] flex justify-between items-center rounded-sm'>
                  <span className='text-2xl text-white font-semibold'>Articles</span>
                  <div className='w-[6rem] h-[3rem] bg-[#D4DBFF] flex items-center justify-center rounded-md'>
                    <span className='text-2xl text-black font-semibold'>255</span>
                  </div>
                </div>

                <div className='w-full h-auto flex flex-col gap-y-7'>
                  {/* Date */}
                  <span className='text-2xl font-semibold text-[#727272]'>January 8, 2025</span>
                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Posted</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>545</span>
                    </div>
                  </div>

                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Pending Edit</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>10</span>
                    </div>
                  </div>

                  <button
                      onClick={() => setShowModal(true)}
                      className="cursor-pointer flex items-center justify-between w-full px-6 py-4 bg-[#6BFFD5] text-black font-medium"
                    >
                      <span className='text-2xl font-semibold'>Add New Article</span>
                      <span className="border-2 border-black rounded-full p-2 flex items-center justify-center">
                        <i className="fas fa-plus text-xl"></i>
                      </span>
                    </button>
                </div>
              </div>
            </div>

            <div className='w-full h-full flex flex-col gap-y-7 overflow-x-scroll overflow-y-scroll'>
              {/* table */}
              <div className='min-w-[94rem] min-h-[5rem] py-2 flex items-center gap-x-2'>
                {/* 3) Replace the static button with CustomDatePicker */}
                <div className='flex-shrink-0'>
                  <CustomDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    popperPlacement="bottom-start"
                    popperClassName="z-50"
                    customInput={
                      <button className='px-3 h-16 rounded-lg border-1 border-gray-500 cursor-pointer'>
                        <i className="text-gray-500 fa-regular fa-calendar text-4xl"></i>
                      </button>
                    }
                  />
                </div>

                <div className="relative h-full min-w-[20rem]">
                  <i className="text-2xl fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
                  <input
                    type="text"
                    placeholder="Search History"
                    className="h-full pl-10 pr-3 py-2 border-1 border-gray-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative h-full min-w-48">
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="pl-4 h-full text-2xl pr-8 py-2 border-1 border-gray-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="cursor-pointer text-2xl fas fa-plus absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>

                <div className="relative h-full min-w-48">
                  <select className="appearance-none border-1 border-gray-500 h-full text-2xl rounded-lg text-gray-500 w-full py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Actions</option>
                    <option>Action 1</option>
                    <option>Action 2</option>
                  </select>
                  <i className="text-2xl fas fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"></i>
                </div>
              </div>

              <div className='min-w-[160rem] w-full font-semibold h-fit grid grid-cols-6 justify-between'>
                {/* table headers */}
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2 cols-span-1'>
                  <span>Date</span>
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2 cols-span-1'>
                  <span>Title</span>
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2 cols-span-1'>
                  <span>Author</span>
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2 cols-span-1'>
                  <span>Status</span>
                </div>
                
                <div className='text-[#727272] justify-between flex text-2xl border-l-1 pl-3 cols-span-1'>
                  <span className='my-2'>Updated</span>
                  <div className='text-[#727272] text-2xl border-l-1 px-3 py-2 w-[7rem] cols-span-1'>
                    <span>Action</span>
                  </div>
                </div>
              </div>

              <div className='w-full min-w-[160rem] h-auto flex flex-col border-t-1 border-t-gray-400'>
                {/* table data rows */}
                <div className='min-w-[94rem] text-xl h-fit font-semibold grid grid-cols-6 justify-between cursor-pointer hover:bg-gray-300'>
                  <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400 cols-span-1'>
                    <span>02-19-2024</span>
                  </div>
                  <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400 cols-span-1'>
                    <span>Perlas ng silanganan</span>
                  </div>
                  <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400 cols-span-1'>
                    <span>Olivia Harper</span>
                  </div>
                  <div className='px-4 py-4 border-b-1 border-gray-400 cols-span-1'>
                    <span className='text-white bg-[#9C7744] border-1 border-black rounded-md px-15 py-1'>Posted</span>
                  </div>
                  
                  <div className='pl-4 pt-1 pb-3 flex justify-between border-b-1 border-gray-400 cols-span-1'>
                    <span className='w-full truncate'>02-19-2024</span>
                    <div className='min-w-[7rem] flex gap-x-2 pl-3 items-center'>
                      <i className='fa-solid fa-pen-to-square cursor-pointer'></i>
                      <i className='fa-solid fa-trash cursor-pointer'></i>
                      <i className='fa-solid fa-bars cursor-pointer'></i>
                    </div>
                  </div>
                </div>
                {/* Additional table rows can follow here */}
              </div>
            </div>
          </div>
        </div>
        {showModal && (
  <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
    <div className="flex w-[85rem] gap-4">
      {/* Left Side - Article Editor Form */}
      <div className="bg-white w-[40rem] p-6 rounded-lg shadow-xl relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
        >
          &times;
        </button>
            
        <h2 className="text-3xl font-bold mb-6">Add New Article</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Title</label>
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Author</label>
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label>Category</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled={category !== ""}>
                  Select a category
                </option>
                {Categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Address</label>
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>Date</label>
              <input
                className="w-full border px-2 py-1 rounded"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label>Thumbnail</label>
              <input
                className="w-full border px-2 py-1 rounded"
                type="file"
                name="thumbnail"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          </div>

          {/* Tiptap Rich Text Editor */}
          <div className="space-y-2">
            <label className="font-bold">Body</label>
            <div className="flex items-center gap-2 p-2 bg-[#d6c2ad] rounded border border-blue-400">
              {/* Heading buttons */}
              <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        editor?.chain().focus().toggleHeading({ level }).run();
                      }}
                      className="text-sm px-1 hover:underline"
                    >
                      H{level}
                    </button>
                  ))}
                </div>

                {/* Font size input */}
                <input
                  type="number"
                  min="10"
                  max="72"
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().setFontSize(`${e.target.value}px`).run();
                  }}
                  defaultValue={20}
                  className="w-12 text-center text-sm px-1 py-0.5 rounded border border-gray-300 bg-white"
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                  }}
                />

              {/* Divider */}
              <div className="border-l h-6 mx-2" />
              {/* Formatting buttons */}
              <div className="flex gap-1 ml-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().toggleBold().run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive("bold") ? "bg-white" : ""}`}
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().toggleUnderline().run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive("underline") ? "bg-white" : ""}`}
                >
                  <Underline size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().toggleItalic().run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive("italic") ? "bg-white" : ""}`}
                >
                  <Italic size={16} />
                </button>
              </div>
              {/* Divider */}
              <div className="border-l h-6 mx-2" />
              {/* Text alignment buttons */}
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().setTextAlign("left").run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive({ textAlign: "left" }) ? "bg-white" : ""}`}
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().setTextAlign("center").run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive({ textAlign: "center" }) ? "bg-white" : ""}`}
                >
                  <AlignCenter size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().setTextAlign("right").run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive({ textAlign: "right" }) ? "bg-white" : ""}`}
                >
                  <AlignRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor?.chain().focus().setTextAlign("justify").run();
                  }}
                  className={`p-1 border rounded ${editor?.isActive({ textAlign: "justify" }) ? "bg-white" : ""}`}
                >
                  <AlignJustify size={16} />
                </button>
              </div>

            </div>

            {/* Editor body */}
            <div className="border rounded p-4 min-h-[150px]" onClick={(e) => e.stopPropagation()}>
              <EditorContent editor={editor} />
            </div>
          </div>

          <Button type="submit" className="mt-4">Submit Article</Button>
        </form>
      </div>
      
      {/* Right Side - Article Preview */}
      <div className="bg-white w-[40rem] p-6 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold mb-4">Article Preview</h3>
        
        {/* Title Section */}
        <div className='border border-gray-200 p-4 mb-4 rounded'>
          <h1 className='text-center text-3xl font-bold'>{title || "Title of the News or Event"}</h1>
        </div>
        
        {/* Info Section */}
        <div className="flex w-full justify-center mb-6">
          <div className="flex w-full items-center justify-center text-center text-base">
            <span className="w-1/4 h-24 border border-gray-300 flex flex-col items-center justify-center p-2">
              <h4 className='text-lg font-medium'>Date</h4>
              <p className="text-sm">{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) : "month dd, yyyy"}</p>
            </span>
            <span className="w-1/4 h-24 border border-gray-300 flex flex-col items-center justify-center p-2">
              <h4 className='text-lg font-medium'>Author</h4>
              <p className="text-sm">{author || "Name of the Author"}</p>
            </span>
            <span className="w-1/4 h-24 border border-gray-300 flex flex-col items-center justify-center p-2">
              <h4 className='text-lg font-medium'>Address</h4>
              <p className="text-sm">{address || "Location of the event or news"}</p>
            </span>
            <span className="w-1/4 h-24 border border-gray-300 flex flex-col items-center justify-center p-2">
              <h4 className='text-lg font-medium'>Category</h4>
              <p className="text-sm">{category || "[placeholder]"}</p>
            </span>
          </div>
        </div>
        
        {/* Article Content Preview */}
        <div className="border border-gray-200 p-4 rounded min-h-[300px]">
          {thumbnail && (
            <div className="flex justify-center mb-4">
              <img 
                src={URL.createObjectURL(thumbnail)} 
                alt="Article thumbnail" 
                className="max-h-64 object-contain"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            {editor?.getHTML() ? (
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            ) : (
              <p className="text-gray-400 italic">Article content will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      </div>
    </>
  )
}

export default ArticleForm