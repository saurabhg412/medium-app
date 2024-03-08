import { useState } from 'react';

function EditPostForm({ post, onClose, onSave }:any) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const updatedPost = { ...post, title, content }; // Create updated post
    onSave(updatedPost);
    onClose(); // Close the edit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block">Title:</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block">Content:</label>
        <textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="mr-2 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditPostForm;
