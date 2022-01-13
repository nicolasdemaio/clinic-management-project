import glob, re, os 

module_parent_directory = "source\model"

owd = os.getcwd()
if not owd.endswith(module_parent_directory): os.chdir(module_parent_directory)

module_paths = glob.glob("**/*.py", recursive = True)

for module_path in module_paths:
    if not re.match( ".*__init__.py$", module_path):
        import_path = module_path[:-3]
        import_path = import_path.replace("/", ".")
        exec(f"from .{import_path} import *")

os.chdir(owd)