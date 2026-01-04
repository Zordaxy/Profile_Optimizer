/**
 * Reads the entire document content and stores it in localStorage as userProfile
 */
export function readProfile() {
  const documentContent = document.body.innerText || document.body.textContent;
  localStorage.setItem("userProfile", documentContent);
  return documentContent;
}
