import React from 'react';

const Blog = () => {
    return (
        <div className='mx-auto'>
            <div tabIndex={0} className="collapse mx-auto collapse-arrow border border-base-300 bg-base-100 rounded-box w-full md:w-4/5 lg:3/5">
                <div className="collapse-title text-xl font-medium">
                    What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content">
                    <p>The Four Kinds of React State to Manage.</p>

                    <p><strong>Local state:</strong>Local state is most often managed in React using the useState hook.local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.</p>

                    <p><strong>Global State:</strong> Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.</p>
                    <p><strong>Server State:</strong> Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.</p>

                    <p><strong>URL state:</strong> URL state is often missing as a category of state, but it is an important one.
                        In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!</p>
                </div>
            </div>
            <div tabIndex={1} className="collapse mx-auto collapse-arrow border border-base-300 bg-base-100 rounded-box w-full md:w-4/5 lg:3/5">
                <div className="collapse-title text-xl font-medium">
                    How does prototypical inheritance work?
                </div>
                <div className="collapse-content">
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__
                    <p></p>
                </div>
            </div>
            <div tabIndex={2} className="collapse mx-auto collapse-arrow border border-base-300 bg-base-100 rounded-box w-full md:w-4/5 lg:3/5">
                <div className="collapse-title text-xl font-medium">
                    What is a unit test? Why should we write unit tests?
                </div>
                <div className="collapse-content">
                    <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.

                    </p>

                    <p>Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages</p>


                </div>
            </div>
            <div tabIndex={3} className="collapse mx-auto collapse-arrow border border-base-300 bg-base-100 rounded-box w-full md:w-4/5 lg:3/5">
                <div className="collapse-title text-xl font-medium">
                    React vs. Angular vs. Vue?
                </div>
                <div className="collapse-content">

                    <h1 className='text-3xl font-semibold'>React</h1>
                    <p>Facebook released React.js in March 2013 as a JavaScript library. Because React just provides one view, it is not appropriate for building an MVC architecture: you must solve the model and controller yourself. Besides this, there are only advantages and lots of advantages.</p>

                    <p>One of the biggest of them is that React.js uses a virtual DOM that only compares the previous HTML code differences and only loads the different parts. This significantly impacts the loading times. In a positive way, of course.</p>
                    <p>With React.js, you handle the markup and the logic in the same file, which means you can output variables in a view component (JSX). React offers a type of mobile solutions for applications called React-Native.</p>
                    <h1 className='text-3xl font-semibold'>Angular </h1>
                    <p>AngularJS was developed in 2009 by Google. The first version was Angular.JS. Angular is currently known as a JavaScript framework. Obviously, all significant Google projects have been developed with Angular.</p>

                    <p>Angular.js is an MVC framework. A major disadvantage of Angular is that it uses a regular DOM, and thus, the entire tree structure of the HTML tags is updated, which massively impacts the loading time. Angular.js has its Ionic framework for mobile applications.</p>
                    <h1 className='text-3xl font-semibold'>Vue</h1>

                    <p>Vue.js is a JavaScript-based progressive framework for creating single-page applications. It was created with scalability and incrementality in mind, as well as ease of integration with other view layer frameworks.</p>
                    <p>
                        Vue is built from the bottom up to be progressively adaptable, unlike other monolithic frameworks. The core library focuses solely on the view layer, and it’s simple to use and connect with other libraries or applications. This framework’s fast learning angle is almost a trademark. It’s a flexible framework that may be used as a library or a full-fledged framework for developing large web applications.
                    </p>


                </div>
            </div>
        </div>
    );
};

export default Blog;