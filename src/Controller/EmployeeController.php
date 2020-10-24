<?php
namespace App\Controller;
use App\Repository\EmployeeRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class EmployeeController
 * @package App\Controller
 *
 * @Route(path="/api/")
 */
class EmployeeController
{
    private $EmployeeRepository;

    public function __construct(EmployeeRepository $EmployeeRepository)
    {
        $this->EmployeeRepository = $EmployeeRepository;
    }

/**
 * @Route("employee/{id}",name="get_one_employee", methods={"GET"})
 */
public function get($id):JsonResponse{
    $employee = $this->EmployeeRepository->findOneBy(['id'=>$id]);

    $data = [
        'id' => $employee->getId(),
        'firstname' => $employee -> getFirstName(),
        'lastname'=> $employee-> getLastName(),
        'email'=> $employee -> getEmail(),
        'birthdate' => $employee -> getBirthDate()];

    return new JsonResponse($data, Response::HTTP_OK);
}/**
     * @Route("employee", name="add_employee", methods={"POST"})
     */
    public function add(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $email = $data['email'];
        $birthdate = $data['birthdate'];
       

        if (empty($firstname) || empty($lastname)) {
            throw new NotFoundHttpException('Expecting mandatory parameters!');
        }

        $this->EmployeeRepository->saveEmployee(
            $firstname, $lastname, $email,$birthdate);

        return new JsonResponse(['status' => 'Employee created!'], Response::HTTP_CREATED);
    }
/**
 * @Route("list", name="get_all_employees", methods={"GET"})
 */
public function getAll(): JsonResponse{
    $employees = $this->EmployeeRepository->findAll();
    $data = [];

    foreach ($employees as $employee){
        $data[]= [
            'id' => $employee->getId(),
            'firstname' => $employee -> getFirstName(),
            'lastname'=> $employee-> getLastName(),
            'email'=> $employee -> getEmail(),
            'birthdate' => $employee -> getBirthDate()];
    }
    return new JsonResponse($data, Response::HTTP_OK);
}
/**
 * @Route("employee/{id}",name="get_one_employee", methods={"PUT"})
 */
public function update($id, Request $request): JsonResponse{
$employee = $this->EmployeeRepository->findOneBy(['id'=> $id]);
$data = \json_decode($request->getContent(), true);

empty($data['firstname']) ? true : $employee -> setFirstName($data['firstname']);
empty($data['lastname']) ? true : $employee -> setLastName($data['lastname']);
empty($data['email']) ? true : $employee -> setEmail($data['email']);
empty($data['birthdate']) ? true : $employee -> setBirthDate($data['birthdate']);

$updateEmployee = $this->EmployeeRepository -> updateEmployee($employee);
return new JsonResponse(['status' => 'Employee updated!'], Response::HTTP_OK);
}
/**
 * @route("employee/{id}", name="delete_employee",methods={"DELETE"})
 */
public function delete($id): JsonResponse{
    $employee = $this->EmployeeRepository->findOneBy(['id'=> $id]);
    $this->EmployeeRepository->deleteEmployee($employee);
    return new JsonResponse(['status'=> 'Employee deleted'],Response:: HTTP_OK);
}
}