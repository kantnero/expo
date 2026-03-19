// Reexport the native module. On web, it will be resolved to <%- project.moduleName %>.web.ts
// and on native platforms to <%- project.moduleName %>.ts
export { default } from './src/<%- project.moduleName %>';
<% if (project.features.includes('View')) { -%>
export { default as <%- project.viewName %> } from './src/<%- project.viewName %>';
<% } -%>
<% if (project.features.includes('SharedObject')) { -%>
export { create<%- project.sharedObjectName %>, use<%- project.sharedObjectName %> } from './src/<%- project.sharedObjectName %>';
<% } -%>
export * from './src/<%- project.name %>.types';
