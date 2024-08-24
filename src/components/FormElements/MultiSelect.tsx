import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface DropdownProps {
  id: string;
  value: string[];
  onChange: (selectedValues: string[]) => void;
}

const MultiSelect: React.FC<DropdownProps> = ({ id, value, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = [];
        for (let i = 0; i < select.options.length; i++) {
          const option = {
            value: select.options[i].value,
            text: select.options[i].innerText,
            selected: value.includes(select.options[i].value),
          };
          newOptions.push(option);
        }
        setOptions(newOptions);
        setSelectedOptions(newOptions.filter(option => option.selected));
      }
    };

    loadOptions();
  }, [id, value]);

  const open = () => setShow(true);

  const select = (index: number) => {
    const option = options[index];
    if (!option.selected) {
      const updatedOptions = [...options];
      updatedOptions[index].selected = true;
      setOptions(updatedOptions);
      const updatedSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedSelectedOptions);
      onChange(updatedSelectedOptions.map(opt => opt.value));
    } else {
      remove(index);
    }
  };

  const remove = (index: number) => {
    const option = options[index];
    const updatedSelectedOptions = selectedOptions.filter(opt => opt.value !== option.value);
    const updatedOptions = options.map(opt =>
      opt.value === option.value ? { ...opt, selected: false } : opt
    );
    setOptions(updatedOptions);
    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions.map(opt => opt.value));
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target))
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [show]);

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Vulnerability Name
      </label>
      <div>
        <select className="hidden" id={id}>
        <option value="Absence Of SSL Certificate">Absence Of SSL Certificate</option>
          <option value="Lockout Policy">Lockout Policy</option>
          <option value="HTTP Methods Allowed">HTTP Methods Allowed</option>
          <option value="HTTP Strict Transport Security">HTTP Strict Transport Security</option>
          <option value="Credentials Transported over an Un-Encrypted Channel">Credentials Transported over an Un-Encrypted Channel</option>
          <option value="Session Managment">Session Managment</option>
          <option value="Weak Password Policy">Weak Password Policy</option>
          <option value="Session Fixation">Session Fixation</option>
          <option value="Session Hijacking">Session Hijacking</option>
          <option value="Authentication Bypass">Authentication Bypass</option>
          <option value="Back & Refresh Attack">Back & Refresh Attack</option>
          <option value="Parameter Based Attacks">Parameter Based Attacks</option>
          <option value="Insecure Direct Object Reference">Insecure Direct Object Reference</option>
          <option value="2FA Rate Limit">2FA Rate Limit</option>
          <option value="2FA Replay Attack">2FA Replay Attack</option>
          <option value="2FA Simple Bypass">2FA Simple Bypass</option>
          <option value="2FA bypass using brute-force attack">2FA bypass using brute-force attack</option>
          <option value="Insecure transportion Layer Security">Insecure transportion Layer Security</option>
          <option value="Weak Encrption Method For Password Policy">Weak Encrption Method For Password Policy</option>
          <option value="Cleartext Storage of Sensitive Information">Cleartext Storage of Sensitive Information</option>
          <option value="Validation Of SSL Cerificate">Validation Of SSL Cerificate</option>
          <option value="SQL Injection /OS Command Injection">SQL Injection /OS Command Injection</option>
          <option value="Cross Site Scripting">Cross Site Scripting</option>
          <option value="Cross Site Request Frogery">Cross Site Request Frogery</option>
          <option value="Unprotected Storage Of Credentials">Unprotected Storage Of Credentials</option>
          <option value="Unrestricted Storage Of Credentials">Unrestricted Storage Of Credentials</option>
          <option value="Private IP Disclosure">Private IP Disclosure</option>
          <option value="Generating of Error Messages Containing Sensitive Information">Generating of Error Messages Containing Sensitive Information</option>
          <option value="Source Code Disclosure">Source Code Disclosure</option>
          <option value="XXE">XXE</option>
          <option value="Directory Listings">Directory Listings</option>
          <option value="Detailed Error Messages Disclosure">Detailed Error Messages Disclosure</option>
          <option value="Server Related Issues">Server Related Issues</option>
          <option value="Vulnerable and Outdated Components">Vulnerable and Outdated Components</option>
          <option value="Brute Force or any automated attacks">Brute Force or any automated attacks</option>
          <option value="Directory traversal/file Types">Directory traversal/file Types</option>
          <option value="Upload Of Unexpected File Types">Upload Of Unexpected File Types</option>
          <option value="HTML Injection">HTML Injection</option>
          <option value="Captcha Bypass">Captcha Bypass</option>
          <option value="Functional Error">Functional Error</option>
          <option value="TLS/SSL certificate invali date">TLS/SSL certificate invali date</option>
          <option value="Absence of Anti-CSRF Tokens">Absence of Anti-CSRF Tokens</option>
          <option value="Incomplete or No Cache-control Header Set">Incomplete or No Cache-control Header Set</option>
          <option value="Cookie without htp-only flag">Cookie without htp-only flag</option>
          <option value="Cookie without secure flag">Cookie without secure flag</option>
          <option value="Cookie without same-site attribute">Cookie without same-site attribute</option>
          <option value="X-frame option header not set">X-frame option header not set</option>
          <option value="X-content header missing">X-content header missing</option>
          <option value="Content Security Policy bypass">Content Security Policy bypass</option>
          <option value="Exposure of Sensitive information & configuration files">Exposure of Sensitive information & configuration files</option>
          <option value="reation of Temporary File in Directory with Insecure Permissions">Creation of Temporary File in Directory with Insecure Permissions</option>
          <option value="Use of Hard-coded Credentials">Use of Hard-coded Credentials</option>
          <option value="Server-Side Request Forgery(SSRF)">Server-Side Request Forgery(SSRF)</option>
          <option value="Improper Privilege Management">Improper Privilege Management</option>
          <option value="Concurrent Execution Using Shared Resource with Improper Synchronization">Concurrent Execution Using Shared Resource with Improper Synchronization</option>
          <option value="Unprotected Admin Panel">Unprotected Admin Panel </option>
          <option value="Incorrect Privilage Assingment">Incorrect Privilage Assingment</option>
          <option value="Improper Input Valiation">Improper Input Valiation</option>
          <option value="URL Redirection to Untrusted Site">URL Redirection to Untrusted Site</option>
          <option value="Cross-origin resource sharing">Cross-origin resource sharing</option>
          <option value="Improper Restriction of excessive Authentication Attempts">Improper Restriction of excessive Authentication Attempts</option>
          <option value="Email Disclosure">Email Disclosure</option>

        </select>

        <div className="flex flex-col items-center">
          <input name="values" type="hidden" defaultValue={value.join(',')} />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selectedOptions.map((option, idx) => (
                      <div
                        key={option.value}
                        className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">{option.text}</div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div
                            onClick={() => remove(options.indexOf(option))}
                            className="cursor-pointer pl-2 hover:text-danger"
                          >
                            <svg
                              className="fill-current"
                              role="button"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedOptions.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder="Select an option"
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                          defaultValue={value.join(',')}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                    <button
                      type="button"
                      onClick={open}
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div
                  className={`max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${
                    show ? "" : "hidden"

                  }`}
                  ref={dropdownRef}
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <div className="flex w-full flex-col">
                    {options.map((option, index) => (
                      <div key={index}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark dark:hover:bg-opacity-10"
                          onClick={() => select(index)}
                        >
                          <div
                            className={`relative flex w-full items-center p-2 pl-2 border-l-2 border-transparent ${
                              selectedOptions.includes(option)
                                ? "border-l-2 border-primary"
                                : ""
                            }`}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="mx-2 leading-6 dark:text-white">{option.text}</div>
                              {option.selected && (
                                <div className="flex items-center text-primary">
                                  <svg
                                    width="12"
                                    height="8"
                                    viewBox="0 0 12 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.25 1.75L4.5 7.5L0.75 3.75"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default MultiSelect;
