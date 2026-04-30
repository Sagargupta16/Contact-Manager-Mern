import { useState } from "react";
import PropTypes from "prop-types";

const TagInput = ({ id, tags, onChange }) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(",", "");
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
          <button
            type="button"
            className="tag-remove"
            onClick={() => handleRemoveTag(tag)}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        id={id}
        className="tag-input"
        type="text"
        placeholder="Enter tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
      />
    </div>
  );
};

TagInput.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagInput;
