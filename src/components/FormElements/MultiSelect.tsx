import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

interface DropdownProps {
  id: string;
  value: string[]; // Add value prop for selected values
  onChange: (selectedValues: string[]) => void; // Add onChange prop
}

const MultiSelect: React.FC<DropdownProps> = ({ id, value, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id) as HTMLSelectElement | null;
      if (select) {
        const newOptions: Option[] = [];
        for (let i = 0; i < select.options.length; i++) {
          newOptions.push({
            value: select.options[i].value,
            text: select.options[i].innerText,
            selected: value.includes(select.options[i].value), // Check if the value is in the passed value prop
          });
        }
        setOptions(newOptions);
        setSelected(newOptions
          .map((option, index) => (option.selected ? index : -1))
          .filter(index => index !== -1));
      }
    };

    loadOptions();
  }, [id, value]);

  const open = () => {
    setShow(true);
  };

  const isOpen = () => {
    return show === true;
  };

  const select = (index: number, event: React.MouseEvent) => {
    const newOptions = [...options];

    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      newOptions[index].element = event.currentTarget as HTMLElement;
      setSelected([...selected, index]);
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
      }
    }

    setOptions(newOptions);
    const selectedValues = newOptions.filter(opt => opt.selected).map(opt => opt.value);
    onChange(selectedValues); // Trigger the onChange with updated selected values
  };

  const remove = (index: number) => {
    const newOptions = [...options];
    const selectedIndex = selected.indexOf(index);

    if (selectedIndex !== -1) {
      newOptions[index].selected = false;
      setSelected(selected.filter((i) => i !== index));
      setOptions(newOptions);
      const selectedValues = newOptions.filter(opt => opt.selected).map(opt => opt.value);
      onChange(selectedValues); // Trigger the onChange with updated selected values
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Vulnerability Name
      </label>
      <div>
        <select className="hidden" id={id}>
        <option value="1">Absence Of SSL Certificate (For production URL)</option>
          <option value="2">Lockout Policy</option>
          <option value="3">HTTP Methods Allowed</option>
          <option value="4">HTTP Strict Transport Security</option>
          <option value="5">Credentials Transported over an Un-Encrypted Channel</option>
          <option value="6">Session Managment</option>
          <option value="7">Weak Password Policy</option>
          <option value="8">Session Fixation</option>
          <option value="9">Session Hijacking</option>
          <option value="10">Authentication Bypass</option>
          <option value="11">Back & Refresh Attack</option>
          <option value="12">Parameter Based Attacks</option>
          <option value="13">Insecure Direct Object Reference</option>
          <option value="14">2FA Rate Limit</option>
          <option value="15">2FA Replay Attack</option>
          <option value="16">2FA Simple Bypass</option>
          <option value="17">2FA bypass using brute-force attack</option>
          <option value="18">Insecure transportion Layer Security</option>
          <option value="19">Weak Encrption Method For Password Policy</option>
          <option value="20">Cleartext Storage of Sensitive Information</option>
          <option value="21">Validation Of SSL Cerificate</option>
          <option value="22">SQL Injection /OS Command Injection</option>
          <option value="23">Cross Site Scripting</option>
          <option value="24">Cross Site Request Frogery</option>
          <option value="25">Unprotected Storage Of Credentials</option>
          <option value="26">Unrestricted Storage Of Credentials</option>
          <option value="27">Private IP Disclosure</option>
          <option value="28">Generating of Error Messages Containing Sensitive Information</option>
          <option value="29">Source Code Disclosure</option>
          <option value="30">XXE</option>
          <option value="31">Directory Listings</option>
          <option value="32">Detailed Error Messages Disclosure</option>
          <option value="33">Server Related Issues</option>
          <option value="34">Vulnerable and Outdated Components</option>
          <option value="35">Brute Force or any automated attacks</option>
          <option value="36">Directory traversal/file Types</option>
          <option value="37">Upload Of Unexpected File Types</option>
          <option value="38">HTML Injection</option>
          <option value="39">Captcha Bypass</option>
          <option value="40">Functional Error</option>
          <option value="41">TLS/SSL certificate invali date</option>
          <option value="42">Absence of Anti-CSRF Tokens</option>
          <option value="43">Incomplete or No Cache-control Header Set</option>
          <option value="44">Cookie without htp-only flag</option>
          <option value="45">Cookie without secure flag</option>
          <option value="46">Cookie without same-site attribute</option>
          <option value="47">X-frame option header not set</option>
          <option value="48">X-content header missing</option>
          <option value="49">Content Security Policy bypass</option>
          <option value="50">Exposure of Sensitive information & configuration files</option>
          <option value="51">Creation of Temporary File in Directory with Insecure Permissions</option>
          <option value="52">Use of Hard-coded Credentials</option>
          <option value="53">Server-Side Request Forgery(SSRF)</option>
          <option value="54">Improper Privilege Management</option>
          <option value="55">Concurrent Execution Using Shared Resource with Improper Synchronization</option>
          <option value="56">Unprotected Admin Panel </option>
          <option value="57">Incorrect Privilage Assingment</option>
          <option value="58">Improper Input Valiation</option>
          <option value="59">URL Redirection to Untrusted Site</option>
          <option value="60">Cross-origin resource sharing</option>
          <option value="61">Improper Restriction of excessive Authentication Attempts</option>

        </select>

        <div className="flex flex-col items-center">
          <input name="values" type="hidden" defaultValue={value.join(',')} />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selected.map((index) => (
                      <div
                        key={index}
                        className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">
                          {options[index].text}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div
                            onClick={() => remove(index)}
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
                    {selected.length === 0 && (
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
                    isOpen() ? "" : "hidden"
                  }`}
                  ref={dropdownRef}
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <div className="flex w-full flex-col">
                    {options.map((option, index) => (
                      <div key={index}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                          onClick={(event) => select(index, event)}
                        >
                          <div
                            className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                              option.selected ? "border-primary" : ""
                            }`}
                          >
                            <div className="flex w-full items-center">
                              <div className="mx-2 leading-6">
                                {option.text}
                              </div>
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
