import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { useToggle } from "@mantine/hooks";
import {
  TextInputProps,
  TextInput,
  Popover,
  Button,
  Group,
  Flex,
  Text,
  Space,
  ScrollArea,
} from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { map, pick, compose, prop, toLower, uniqBy } from "rambda";
import "react-international-phone/style.css";
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";

const makeOptions = map(
  compose(pick(["iso2", "name", "dialCode"]), parseCountry)
);

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedCountryIso: CountryIso2;
  setCountryIso: (countryIso2: CountryIso2) => void;
  isVisible?: boolean;
}

const DROPDOWN_MAX_HEIGHT = 200;
const DROPDOWN_PADDING_Y = 8;

// eslint-disable-next-line react/display-name
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ selectedCountryIso, setCountryIso, isVisible = false, ...props }, ref) => {
    const viewportRef = useRef<HTMLDivElement>(null);

    const options = useMemo(() => makeOptions(defaultCountries), []);
    // Maps the first occurrence of the first character of each country
    // name to it's array index (in 'options' array)
    const charIndex = useMemo(() => {
      const charMap = map((country) => toLower(country.name[0]), options) as string[];
      const itr = charMap.map((char, index) => ({ char, index })) as Array<{ char: string, index: number }>;
      const uniqs = uniqBy(prop("char"))(itr);

      return uniqs.reduce(
        (obj: Record<string, number>, { char, index }: any) => {
          obj[char] = index;
          return obj;
        },
        {}
      ) as Record<string, number>;
    }, [options]);

    const scrollWhenTyped = useCallback(
      (evt: KeyboardEvent) => {
        const char = evt.key.toLowerCase();
        if (!viewportRef.current || !char.match(/[a-z]/i)) {
          return;
        }

        const optionHeight =
          (viewportRef.current.scrollHeight - 2 * DROPDOWN_PADDING_Y) /
          options.length;

        const scrollFromTop = optionHeight * charIndex[char];

        if (viewportRef.current) {
          viewportRef.current.scrollTo({ top: scrollFromTop });
        }
      },
      [charIndex, options.length]
    );

    useEffect(() => {
      if (isVisible) {
        window.addEventListener("keydown", scrollWhenTyped);
      }

      return () => {
        if (isVisible) {
          window.removeEventListener("keydown", scrollWhenTyped);
        }
      };
    }, [isVisible, scrollWhenTyped]);

    return (
      <ScrollArea
        ref={ref}
        viewportRef={viewportRef}
        h={DROPDOWN_MAX_HEIGHT}
        tabIndex={0}
        {...props}
      >
        <Space h={DROPDOWN_PADDING_Y} />
        {options.map((option: any) => (
          <Flex
            tabIndex={-1}
            key={option.iso2}
            w="100%"
            gap={8}
            align="center"
            role="button"
            px={12}
            py={DROPDOWN_PADDING_Y}
            data-selected={option.iso2 === selectedCountryIso}
            onClick={() => setCountryIso(option.iso2)}
            className={`
  cursor-pointer 
  hover:bg-primary-100 hover:text-black
  ${option.iso2 === selectedCountryIso && "bg-primary-100 text-black"}
`}
          >
            <FlagImage iso2={option.iso2} size={20} />
            <Text size="sm" className="flex-1">
              {option.name}
            </Text>
            <Text size="sm">+{option.dialCode}</Text>
          </Flex>
        ))}
        <Space h={DROPDOWN_PADDING_Y} />
      </ScrollArea>
    );
  }
);

const PhoneNumber: React.FC<TextInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [dropdownOpened, toggleDropdown] = useToggle();

  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      countries: defaultCountries,
      value: value?.toString(),
      onChange: ({ phone }: { phone: any }) => {
        onChange && onChange(phone);
      },
    });

  return (
    <Popover
      opened={dropdownOpened}
      position="bottom-end"
      width="target"
      shadow="md"
    >
      <Popover.Target>
        <TextInput
          ref={inputRef}
          value={phone}
          onChange={handlePhoneValueChange}
          rightSectionWidth="auto"
          rightSection={
            <Button
              variant=""
              px={8}
              onFocus={() => toggleDropdown()}
              onBlur={() => toggleDropdown(false)}
              className="bg-transparent hover:bg-neutral-100"
            >
              <Group gap={4}>
                <FlagImage iso2={country.iso2} size={20} />
                <ChevronDown size="1rem" />
              </Group>
            </Button>
          }
          {...props}
        />
      </Popover.Target>

      <Popover.Dropdown p={0} className="overflow-hidden">
        <Dropdown
          setCountryIso={setCountry}
          selectedCountryIso={country.iso2}
          isVisible={dropdownOpened}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export default PhoneNumber;
