import { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
// import 'react-tag-input/dist/modules/reactTags.css';

export default function TagInputComponent({ placeholder, name, handleTagsChange }) {
    const [tags, setTags] = useState([]);

    console.log({tags});

    useEffect(() => {
        handleTagsChange(tags);
    }, [tags]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div>
            <ReactTags
                tags={tags}
                // suggestions={suggestions}
                // delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
}
