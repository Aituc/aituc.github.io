document.addEventListener('DOMContentLoaded', function() {
    // Dynamically import CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://aituc.github.io/css-embed/main.css';
    document.head.appendChild(link);

    const demoContainer = document.getElementById('demo-container');

    function applyCustomSizeClasses(element) {
        Array.from(element.classList).forEach(cls => {
            if (cls.startsWith('h-') || cls.startsWith('w-') || cls.startsWith('text-')) {
                const [property, value] = cls.split('-');
                if (value.endsWith('px') || value.endsWith('vh') || value.endsWith('vw') || !isNaN(value)) {
                    if (property === 'text') {
                        element.style.fontSize = value.endsWith('px') || value.endsWith('vh') || value.endsWith('vw') ? value : `${value}px`;
                    } else {
                        element.style[property === 'h' ? 'height' : 'width'] = value.endsWith('px') || value.endsWith('vh') || value.endsWith('vw') ? value : `${value}%`;
                    }
                }
            }
        });
    }

    function applyFlexClasses(element) {
        if (element.classList.contains('flex')) {
            element.style.display = 'flex';
        }
        if (element.classList.contains('flex-col')) {
            element.style.flexDirection = 'column';
        }
        if (element.classList.contains('items-center')) {
            element.style.alignItems = 'center';
        }
        if (element.classList.contains('justify-center')) {
            element.style.justifyContent = 'center';
        }
        if (element.classList.contains('content-center')) {
            element.style.alignContent = 'center';
        }
    }

    function createInteractiveSection(title, classes, type = 'toggle') {
        const section = document.createElement('div');
        section.className = 'mar-4';
        
        const heading = document.createElement('h2');
        heading.textContent = title;
        heading.className = 'h2 tblue bold';
        section.appendChild(heading);

        const demoElement = document.createElement('div');
        demoElement.className = 'mar-2 pad-2 b-s1';
        demoElement.textContent = 'Demo Element';
        section.appendChild(demoElement);

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex flex-wrap';

        classes.forEach(cls => {
            if (type === 'toggle') {
                const button = document.createElement('button');
                button.textContent = cls;
                button.className = 'mar-1 pad-1 bg-blue twhite rounded';
                button.onclick = () => {
                    demoElement.classList.toggle(cls);
                    applyCustomSizeClasses(demoElement);
                    applyFlexClasses(demoElement);
                };
                controlsDiv.appendChild(button);
            } else if (type === 'radio') {
                const label = document.createElement('label');
                label.className = 'mar-1';
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = title;
                radio.value = cls;
                radio.onchange = () => {
                    classes.forEach(c => demoElement.classList.remove(c));
                    demoElement.classList.add(cls);
                    applyCustomSizeClasses(demoElement);
                    applyFlexClasses(demoElement);
                };
                label.appendChild(radio);
                label.appendChild(document.createTextNode(cls));
                controlsDiv.appendChild(label);
            }
        });

        section.appendChild(controlsDiv);
        return section;
    }

    function createGradientSection(title, classes) {
        const section = document.createElement('div');
        section.className = 'mar-4';
        
        const heading = document.createElement('h2');
        heading.textContent = title;
        heading.className = 'h2 tblue bold';
        section.appendChild(heading);

        const gradientContainer = document.createElement('div');
        gradientContainer.className = 'flex flex-wrap';

        classes.forEach(cls => {
            const gradientBox = document.createElement('div');
            gradientBox.className = `w-40 h-40 mar-2 b-s1 ${cls}`;
            gradientBox.title = cls;

            const label = document.createElement('div');
            label.textContent = cls;
            label.className = 'text-sm text-center bg-white pad-1';

            const boxWrapper = document.createElement('div');
            boxWrapper.className = 'flex flex-col items-center mar-2';
            boxWrapper.appendChild(gradientBox);
            boxWrapper.appendChild(label);

            gradientContainer.appendChild(boxWrapper);
        });

        section.appendChild(gradientContainer);
        return section;
    }

    function createGradientTextSection(title, classes) {
        const section = document.createElement('div');
        section.className = 'mar-4';
        
        const heading = document.createElement('h2');
        heading.textContent = title;
        heading.className = 'h2 tblue bold';
        section.appendChild(heading);

        const textContainer = document.createElement('div');
        textContainer.className = 'flex flex-wrap';

        classes.forEach(cls => {
            const textElement = document.createElement('div');
            textElement.className = `text-xl bold mar-2 pad-2 ${cls}`;
            textElement.textContent = 'Gradient Text';

            const label = document.createElement('div');
            label.textContent = cls;
            label.className = 'text-sm text-center';

            const wrapper = document.createElement('div');
            wrapper.className = 'flex flex-col items-center mar-2';
            wrapper.appendChild(textElement);
            wrapper.appendChild(label);

            textContainer.appendChild(wrapper);
        });

        section.appendChild(textContainer);
        return section;
    }

    function createCustomSizeDemo(title) {
        const section = document.createElement('div');
        section.className = 'mar-4';
        
        const heading = document.createElement('h2');
        heading.textContent = title;
        heading.className = 'h2 tblue bold';
        section.appendChild(heading);

        const inputContainer = document.createElement('div');
        inputContainer.className = 'flex flex-wrap items-center';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter class (e.g., h-100px, w-50vh, text-18px)';
        input.className = 'mar-2 pad-2 b-s1';

        const applyButton = document.createElement('button');
        applyButton.textContent = 'Apply';
        applyButton.className = 'mar-2 pad-2 bg-blue twhite rounded';

        const demoElement = document.createElement('div');
        demoElement.className = 'mar-2 pad-2 b-s1 bg-blue';
        demoElement.textContent = 'Demo Element';

        applyButton.onclick = () => {
            const cls = input.value.trim();
            if (cls) {
                demoElement.className = `mar-2 pad-2 b-s1 bg-blue ${cls}`;
                applyCustomSizeClasses(demoElement);
            }
        };

        inputContainer.appendChild(input);
        inputContainer.appendChild(applyButton);
        section.appendChild(inputContainer);
        section.appendChild(demoElement);

        return section;
    }

    // Define color combinations for gradients
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'purple', 'white', 'black', 'gray', 'brown'];

    // Generate text gradient classes
    const textGradientClasses = [];
    for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
            textGradientClasses.push(`tgrad-${colors[i]}-${colors[j]}`);
        }
    }

    // Generate background gradient classes
    const bgGradientClasses = [];
    const angles = [0, 90, 180];
    const bgColors = ['r', 'o', 'y', 'g', 'b', 'i', 'v', 'p']; // Abbreviated colors for background gradients
    for (let i = 0; i < bgColors.length; i++) {
        for (let j = i + 1; j < bgColors.length; j++) {
            angles.forEach(angle => {
                bgGradientClasses.push(`grad-${bgColors[i]}${bgColors[j]}${angle}`);
            });
        }
    }

    // Padding
    demoContainer.appendChild(createInteractiveSection('Padding', ['pad-1', 'pad-2', 'pad-3', 'pad-4']));

    // Margin
    demoContainer.appendChild(createInteractiveSection('Margin', ['mar-1', 'mar-2', 'mar-3', 'mar-4']));

    // Margin directions
    const marginDirections = ['m-l', 'm-r', 'm-t', 'm-b', 'm-l-', 'm-r-', 'm-t-', 'm-b-'];
    marginDirections.forEach(dir => {
        demoContainer.appendChild(createInteractiveSection(`Margin ${dir}`, [1, 2, 3, 4].map(n => `${dir}${n}`)));
    });

    // Text alignment
    demoContainer.appendChild(createInteractiveSection('Text Alignment', ['text-left', 'text-center', 'text-right'], 'radio'));

    // Font size
    demoContainer.appendChild(createInteractiveSection('Font Size', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'text-sm', 'text-base', 'text-lg', 'text-xl'], 'radio'));

    // Font weight
    demoContainer.appendChild(createInteractiveSection('Font Weight', ['lesser', 'less', 'normal', 'bold', 'bolder'], 'radio'));

    // Colors
    demoContainer.appendChild(createInteractiveSection('Text Colors', ['tblack', 'twhite', 'tgray', 'tgrey', 'tred', 'tblue', 'torange', 'tyellow', 'tgreen', 'tpurple', 'tviolet'], 'radio'));

    // Background colors
    demoContainer.appendChild(createInteractiveSection('Background Colors', ['bg-white', 'bg-black', 'bg-gray', 'bg-grey', 'bg-red', 'bg-blue', 'bg-orange', 'bg-yellow', 'bg-green', 'bg-purple', 'bg-violet'], 'radio'));

    // Flexbox
    demoContainer.appendChild(createInteractiveSection('Flexbox', ['flex', 'flex-col', 'items-center', 'justify-center', 'content-center']));

    // Display
    demoContainer.appendChild(createInteractiveSection('Display', ['view-none', 'show-none', 'display-none']));

    // Width and Height
    const sizeClasses = Array.from({length: 100}, (_, i) => i + 1);
    demoContainer.appendChild(createInteractiveSection('Width', sizeClasses.map(n => `w-${n}`)));
    demoContainer.appendChild(createInteractiveSection('Height', sizeClasses.map(n => `h-${n}`)));

    // Border
    const borderStyles = ['b-s', 'b-dot', 'b-dash'];
    borderStyles.forEach(style => {
        demoContainer.appendChild(createInteractiveSection(`Border (${style})`, Array.from({length: 10}, (_, i) => `${style}${i+1}`), 'radio'));
    });

    // Border radius
    demoContainer.appendChild(createInteractiveSection('Border Radius', ['rounded', 'round-full'], 'radio'));

    // Text Gradients
    demoContainer.appendChild(createGradientTextSection('Text Gradients', textGradientClasses));

    // Background Gradients
    demoContainer.appendChild(createGradientSection('Background Gradients', bgGradientClasses));

    // Custom Size Classes
    demoContainer.appendChild(createCustomSizeDemo('Custom Size Classes'));

    // Custom Text Sizes
    demoContainer.appendChild(createCustomSizeDemo('Custom Text Sizes'));

    // Opacity
    demoContainer.appendChild(createInteractiveSection('Opacity', ['opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'], 'radio'));

    // Overflow
    demoContainer.appendChild(createInteractiveSection('Overflow', ['overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll'], 'radio'));

    // Position
    demoContainer.appendChild(createInteractiveSection('Position', ['static', 'relative', 'absolute', 'fixed', 'sticky'], 'radio'));

    // Z-index
    demoContainer.appendChild(createInteractiveSection('Z-index', ['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50'], 'radio'));

    // Transitions
    demoContainer.appendChild(createInteractiveSection('Transitions', ['transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform'], 'radio'));

    // Transforms
    demoContainer.appendChild(createInteractiveSection('Transforms', ['scale-90', 'scale-100', 'scale-110', 'rotate-45', 'rotate-90', 'rotate-180', 'translate-x-1', 'translate-y-1'], 'radio'));

    // Shadows
    demoContainer.appendChild(createInteractiveSection('Shadows', ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'], 'radio'));

    // Custom Rounded Corners
    function createCustomRoundedClasses() {
        const sizes = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50];
        const units = ['px', 'vh', 'vw'];
        const roundedClasses = [];
        sizes.forEach(size => {
            units.forEach(unit => {
                roundedClasses.push(`round-${size}${unit}`);
            });
        });
        return roundedClasses;
    }

    // Function to apply custom rounded classes
    function applyCustomRoundedClass(element, className) {
        const match = className.match(/round-(\d+)(px|vh|vw)/);
        if (match) {
            const [, size, unit] = match;
            element.style.borderRadius = `${size}${unit}`;
        }
    }

    // Function to create rounded demo section
    function createRoundedDemoSection(title, classes) {
        const section = document.createElement('div');
        section.className = 'mar-4';
        
        const heading = document.createElement('h2');
        heading.textContent = title;
        heading.className = 'h2 tblue bold';
        section.appendChild(heading);

        const demoContainer = document.createElement('div');
        demoContainer.className = 'flex flex-wrap';

        classes.forEach(cls => {
            const demoElement = document.createElement('div');
            demoElement.className = `w-40 h-40 mar-2 bg-blue ${cls}`;
            applyCustomRoundedClass(demoElement, cls);

            const label = document.createElement('div');
            label.textContent = cls;
            label.className = 'text-sm text-center mar-t-1';

            const wrapper = document.createElement('div');
            wrapper.className = 'flex flex-col items-center mar-2';
            wrapper.appendChild(demoElement);
            wrapper.appendChild(label);

            demoContainer.appendChild(wrapper);
        });

        section.appendChild(demoContainer);
        return section;
    }

    // Add the rounded demo section to the page
    const roundedClasses = createCustomRoundedClasses();
    demoContainer.appendChild(createRoundedDemoSection('Custom Rounded Corners', roundedClasses));
});

// Define color combinations for gradients
const colors = ['r', 'o', 'y', 'g', 'b', 'i', 'v', 'p', 'w', 'black', 'grey', 'brown'];

// Generate text gradient classes
const textGradientClasses = [];
for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
        textGradientClasses.push(`tgrad-${colors[i]}-${colors[j]}`);
    }
}

// Function to create gradient text demo section
function createGradientTextSection(title, classes) {
    const section = document.createElement('div');
    section.className = 'mar-4';
    
    const heading = document.createElement('h2');
    heading.textContent = title;
    heading.className = 'h2 tblue bold';
    section.appendChild(heading);

    const textContainer = document.createElement('div');
    textContainer.className = 'flex flex-wrap';

    classes.forEach(cls => {
        const textElement = document.createElement('div');
        textElement.className = `text-xl bold mar-2 pad-2 ${cls}`;
        textElement.textContent = 'Gradient Text';

        const label = document.createElement('div');
        label.textContent = cls;
        label.className = 'text-sm text-center';

        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col items-center mar-2';
        wrapper.appendChild(textElement);
        wrapper.appendChild(label);

        textContainer.appendChild(wrapper);
    });

    section.appendChild(textContainer);
    return section;
}

// Add the gradient text demo section to the page
document.addEventListener('DOMContentLoaded', function() {
    const demoContainer = document.getElementById('demo-container');
    if (demoContainer) {
        demoContainer.appendChild(createGradientTextSection('Text Gradients', textGradientClasses));
    }
});

