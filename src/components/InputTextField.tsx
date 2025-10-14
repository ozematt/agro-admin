type InputTextFieldProps = {
  id: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputTextField = ({
  id,
  placeholder,
  type = "text",
  defaultValue,
  error,
  onChange,
}: InputTextFieldProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={` ${error ? "ring-red-500 focus:ring-red-500" : "ring-slate-500 focus:ring-slate-800"} peer h-[40px] w-full rounded-[5px] pl-4 placeholder-transparent ring-1 focus:ring-2 focus:outline-none sm:h-[50px]`}
      />
      <label
        htmlFor={id}
        className="font-barlow-condensed pointer-events-none absolute top-[-25px] left-0 text-sm tracking-[0.5px] transition-all duration-300 ease-in-out select-none peer-placeholder-shown:top-[7px] peer-placeholder-shown:left-4.5 peer-placeholder-shown:text-base sm:top-[-28px] sm:text-base sm:peer-placeholder-shown:top-[9px] sm:peer-placeholder-shown:text-xl"
      >
        {placeholder}
      </label>
      {error && (
        <p className="font-barlow-condensed absolute top-[-28px] right-0 text-sm tracking-[.5px] text-red-500 sm:text-base">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputTextField;
