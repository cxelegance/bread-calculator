# Bread Calculator
**yarn install**<br>
**yarn run test**<br>
**yarn run dev-server**<br>
Point your browser to http://localhost:8080

If you want to clean up:<br>
**yarn run clean**

If you want to regenerate the JSDoc:<br>
**yarn run doc**<br>
(see the generated /doc/ folder)

If you want to build:<br>
**yarn run build:prod**<br>
(see the generated /public/dist/ folder)

Please check out the **/CHANGELOG.md**.

## Why This Bread Calculator?
This calculator was inspired by the Food Geek Bread Calculator (https://foodgeek.dk/en/bread-calculator/). What sets them apart essentially is that this new calculator shows each ingredient's percentage contribution to the total bread weight. For example, you can see each individual flour's contribution to the overall bread weight, as well as to the overall flour weight; this includes any flour in a mixture—a mixture might be a starter/levain.

## Bread/Mixture Libraries
The logic for making calculations relating to bread and flour/liquid mixtures has been separated from the React components; the latter are merely responsible for displaying information. See the /src/lib/ folder and see the Class section in the documentation. These libraries could be useful to someone and are fairly tested and proven in this package.

## BlurInput
A BlurInput React component exists for allowing input changes to occur without dispatch; once the user blurs away from the input, then a dispatch can be made (React Hooks are used). Take a look at /src/components/BlurInput.js to see how this works (simple).