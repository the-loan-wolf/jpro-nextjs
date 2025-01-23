import InputField from "./InputField"

const SkillInfo = () => {
  return (
    <div id="skillsInfo" className="py-3 border-b-2">
          <div id="skillInfoChild">
            <InputField id="skillName" labelName="Skill Name" />
            <InputField
              id="skillSource"
              labelName="Where you learned it from"
            />
            <InputField id="skillEx" labelName="Experience Time" />
          </div>
          <button
            id="skillBtn"
            type="button"
            className="p-3 bg-lime-200 m-3 rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 transition ease-in-out"
          >
            Add more Skill
          </button>
        </div>
  )
}
export default SkillInfo